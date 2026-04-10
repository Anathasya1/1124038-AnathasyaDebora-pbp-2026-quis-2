import express from "express";
// import dotenv from 'dotenv';
import globalApi from './roots/GlobalApi'; //nanti ganti
import sequelize from "./../config/database";
import { errorHanldeMiddleware } from "./middlewares/errorMiddleware";
import { loggerMiddleware } from "./middlewares/loggerMiddleware";

// dotenv.config();

const app = express();

app.use(express.json());
app.use(loggerMiddleware); 

app.use('/api', globalApi);

app.get("/api/test", (req, res) => {
    res.send("API Jalur /api/test sudah nyambung!");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use(errorHanldeMiddleware);

sequelize.authenticate()
    .then(() => console.log("DB Successfully Connected"))
    .catch(err => console.error("DB Error: ", err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server is Running")
});


