import mongoose from "mongoose";
import express, {Express} from "express";
import realisateurRoutes from "./routes/realisateurRoutes";
import filmRoutes from "./routes/filmRoutes";
import sessionRoutes from "./routes/sessionRoutes";

mongoose.connect('mongodb+srv://davalenzo:UxXqNJRFWQBW4vBH@mern.baujaue.mongodb.net/MERN?retryWrites=true&w=majority&appName=MERN'
).then(() =>
  console.log('MongoDB Connected')
)

const app: Express = express();

const PORT: string | number = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use('/api/realisateur', realisateurRoutes);
app.use('/api/film', filmRoutes);
app.use('/api/session', sessionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});


