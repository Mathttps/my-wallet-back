import express from 'express';
import cors from 'cors';
import usersRoutes from './routes/usersRoutes.js';
import extractRoutes from './routes/extractRoutes.js'
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRoutes);
app.use(extractRoutes);

const mongoclient = new MongoClient(process.env.DATABASE_URL)
try {
    await mongoclient.connect()
    console.log("MongoDB conectado")
} catch (err) {
    console.log(err)
}

export const db = mongoclient.db()

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));