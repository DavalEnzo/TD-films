import mongoose, {Schema} from "mongoose";
import {IFilm} from "./Film";

export interface ISession extends Document {
    film: IFilm;
    date: Date;
    time: string;
    availableSeats: number;
}

const sessionSchema = new Schema<ISession>({
    film: {
        type: Schema.Types.ObjectId,
        ref: 'Film'
    },
    date: Date,
    time: String,
    availableSeats: Number
});

const Session = mongoose.model<ISession>('Session', sessionSchema);

export default Session;
