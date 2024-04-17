import mongoose, {Schema} from "mongoose";

// Ne pas oublier d'importer Document pour pouvoir utiliser l'objet Film
export interface IDirector extends Document {
    id: number;
    name: string;
    birthDate: Date;
    biography: string;
}

const realisateurSchema = new Schema<IDirector>({
    name: String,
    birthDate: Date,
    biography: String
});

const Realisateur = mongoose.model<IDirector>('Realisateur', realisateurSchema);

export default Realisateur;
