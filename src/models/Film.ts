import {IDirector} from "./Realisateur";
import mongoose, {Schema} from "mongoose";

export interface IFilm extends Document{
    id: number;
    title: string;
    releaseYear: number;
    genre: string;
    directors: IDirector[];
}

export const filmSchema = new Schema<IFilm>({
    title: String,
    releaseYear: Number,
    genre: String,
    directors: [{
        type: Schema.Types.ObjectId,
        ref: 'Realisateur',
    }]
});

const Film = mongoose.model<IFilm>('Film', filmSchema);

export default Film;
