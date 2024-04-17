import {Router, Request, Response} from "express";
import Realisateur from "../models/Realisateur";

const router = Router();

router.get('', (_req: Request, res: Response) => {
    Realisateur.find().then((realisateurs) => {
        res.status(200).send(realisateurs)
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la récupération de la ressource" + error)
    });
});

router.get('/:id', (req: Request, res: Response) => {
    Realisateur.findById(req.params.id).then((realisateur) => {
        if (realisateur) {
            res.status(200).send(realisateur)
        } else {
            res.status(404).send(`Livre inconnu`)
        }
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la récupération de la ressource" + error)
    });
});

router.post('', (req: Request, res: Response) => {
    const realisateur = req.body;

    const newRealisateur = new Realisateur({
        name: realisateur.name,
        birthDate: realisateur.birthDate,
        biography: realisateur.biography
    });

    newRealisateur.save().then(() => {
        res.status(201).send("Ressource créée")
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la création de la ressource" + error)
    });
});

router.put('/:id', (req: Request, res: Response) => {
    let realisateurSelected = req.body

    Realisateur.findByIdAndUpdate(req.params.id, realisateurSelected).then(() => {
        res.status(200).send("Ressource modifiée");
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la modification de la ressource" + error)
    });
})

router.delete('/:id', (req: Request, res: Response) => {
    Realisateur.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).send("Ressource supprimée");
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la suppression de la ressource" + error)
    });
})

export default router;
