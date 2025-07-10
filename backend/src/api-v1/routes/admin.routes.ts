import { Router } from "express";
import { adminLogin, adminRegistration } from "../controllers/admin.controllers";

const adminRouter: Router = Router();

adminRouter.post("/register/admin", adminRegistration);
adminRouter.post("/login/admin", adminLogin);

export default adminRouter;
