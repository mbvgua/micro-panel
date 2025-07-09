import { Router } from "express";
import { createMicrofinance, getMicrofinances } from "../controllers/microfinance.controllers";

const microFinRouter = Router();

microFinRouter.post("/microfinances", createMicrofinance);
microFinRouter.get("/microfinances", getMicrofinances);

export default microFinRouter;
