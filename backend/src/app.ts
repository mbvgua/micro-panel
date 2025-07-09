import express, { json } from "express";
import adminRouter from "./api-v1/routes/admin.routes";

const app = express();

// add body to responses
app.use(json());
app.use("/v1/auth",adminRouter)

export default app;
