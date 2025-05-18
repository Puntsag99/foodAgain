import express from "express";
import { connectDatabase } from "./database";
import { authRouter, Catergoryrouther } from "./routers";
import { configDotenv } from "dotenv";

const app = express();

configDotenv();
connectDatabase();

const port = 8000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/Food-category", Catergoryrouther);

app.listen(port, () => console.log(`http://localhost:${port}`));
