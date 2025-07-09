import { Router } from "express";
import { adminRegistration } from "../controllers/admin.controllers";

const adminRouter: Router = Router();

adminRouter.post("/register/admin", adminRegistration);

export default adminRouter;
