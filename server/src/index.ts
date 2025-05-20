import express from "express";
import { configDotenv } from "dotenv";
import { connectDatabase } from "./database";
import { authRouter, Catergoryrouther } from "./routers";

const app = express();

configDotenv();
connectDatabase();

const port = 8000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/Food-category", Catergoryrouther);

app.listen(port, () => console.log(`http://localhost:${port}`));
