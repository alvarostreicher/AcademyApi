import express from 'express';
import mongoose from 'mongoose';
import { router } from './routes/index';
import morgan from 'morgan';
import cors from 'cors';
require('dotenv/config');

const app = express();


mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true})
.then(() => {
    console.log('DB connection successful')
})
.catch(err => console.error(err));

app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);


const PORT = 5000;

app.listen(PORT, () => {
    console.log('server running')
});