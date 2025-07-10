import { Router } from "express";
import { applyLoan, getLoans } from "../controllers/loan.controllers";

const loanRouter = Router();

loanRouter.post("/loans", applyLoan);
loanRouter.get("/loans", getLoans);

export default loanRouter;
