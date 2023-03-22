import express  from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import router from './Routes/index.js'

const DATE_NOW = new Date()

dotenv.config()
const app = new express();

app.use(express.json());
app.use(cors());
app.use('/api', router);
app.listen(process.env.PORT, () => {
    console.log(`[${DATE_NOW}] ===> EXPRESS WAS INITIALIZATED ON ${process.env.HOST_URL}:${process.env.PORT} `)
})




