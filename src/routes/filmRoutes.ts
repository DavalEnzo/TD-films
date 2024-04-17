import {Router, Request, Response} from "express";
import Film from "../models/Film";

const router = Router();

router.get('/', (_req: Request, res: Response) => {
    Film.find().populate("directors", "-__v").then((auteurs) => {
        res.status(200).send(auteurs)
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la récupération de la ressource" + error)
    });
});

router.get('/:id', (req: Request, res: Response) => {
    Film.findById(req.params.id).populate("directors", "-__v").then((film) => {
        if (film) {
            res.status(200).send(film)
        } else {
            res.status(404).send(`Film inconnu`)
        }
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la récupération de la ressource" + error)
    });
});

router.post('', (req: Request, res: Response) => {
    let film = req.body;

    const newFilm = new Film({
        title: film.title,
        genre: film.genre,
        releaseYear: film.releaseYear,
        directors: film.directors
    });

    newFilm.save().then(() => {
        res.status(201).send("Ressource créée")
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la création de la ressource" + error)
    });
});

router.put('/:id', (req: Request, res: Response) => {
    let filmSelected = req.body

    Film.findByIdAndUpdate(req.params.id, filmSelected).then(() => {
        res.status(200).send("Ressource modifiée");
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la modification de la ressource" + error)
    });
});

router.delete('/:id', (req: Request, res: Response) => {
    Film.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).send("Ressource supprimée");
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la suppression de la ressource" + error)
    });
});

export default router;
