import express from "express";
import { configDotenv } from "dotenv";
import { connectDatabase } from "./database";
import {
  authRouter,
  Catergoryrouther,
  foodRouther,
  foodOrderRouther,
} from "./routers";

const app = express();

configDotenv();
connectDatabase();

const port = 8000;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", foodRouther);
app.use("/food-order", foodOrderRouther);
app.use("/Food-category", Catergoryrouther);

app.listen(port, () => console.log(`http://localhost:${port}`));
