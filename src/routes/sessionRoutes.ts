import {Router, Request, Response} from "express";
import Session from "../models/Session";

const router = Router();

router.get('', (_req: Request, res: Response) => {
    Session.find().populate({path: "film", populate: "directors"}).then((sessions) => {
        res.status(200).send(sessions)
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la récupération de la ressource" + error)
    });
});

router.get('/:id', (req: Request, res: Response) => {
    Session.findById(req.params.id).populate("film").then((session) => {
        if (session) {
            res.status(200).send(session)
        } else {
            res.status(404).send(`Livre inconnu`)
        }
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la récupération de la ressource" + error)
    });
});

router.post('', (req: Request, res: Response) => {
    let session = req.body;

    const newSession = new Session({
        film: session.film,
        date: session.date,
        time: session.time,
        availableSeats: session.availableSeats
    });

    newSession.save().then(() => {
        res.status(201).send("Ressource créée")
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la création de la ressource" + error)
    });
});

router.put('/:id', (req: Request, res: Response) => {
    let sessionSelected = req.body

    Session.findByIdAndUpdate(req.params.id, sessionSelected).then(() => {
        res.status(200).send("Ressource modifiée");
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la modification de la ressource" + error)
    });
})

router.delete('/:id', (req: Request, res: Response) => {
    Session.findByIdAndDelete(req.params.id).then(() => {
        res.status(200).send("Ressource supprimée");
    }).catch((error: any) => {
        res.status(500).send("Erreur lors de la suppression de la ressource" + error)
    });
})

export default router;
