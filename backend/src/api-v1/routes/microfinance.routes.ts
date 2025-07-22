import { Router } from "express";
import {
  createMicrofinance,
  deleteMicrofinance,
  getMicrofinances,
  updateMicrofinance,
} from "../controllers/microfinance.controllers";

const microFinRouter = Router();

microFinRouter.post("/microfinances", createMicrofinance);
microFinRouter.get("/microfinances", getMicrofinances);
microFinRouter.put("/microfinances/update/:id", updateMicrofinance);
microFinRouter.put("/microfinances/delete/:id", deleteMicrofinance);

export default microFinRouter;
