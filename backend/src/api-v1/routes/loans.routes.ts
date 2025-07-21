import { Router } from "express";
import {
  applyLoan,
  deleteLoan,
  getLoans,
} from "../controllers/loan.controllers";

const loanRouter = Router();

loanRouter.post("/loans", applyLoan);
loanRouter.get("/loans", getLoans);
loanRouter.put("/loans/delete/:id", deleteLoan);

export default loanRouter;
