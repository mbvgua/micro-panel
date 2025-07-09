import express, { json } from "express";
import adminRouter from "./api-v1/routes/admin.routes";
import memberRouter from "./api-v1/routes/member.routes";

const app = express();

// add body to responses
app.use(json());
app.use("/v1/auth",adminRouter)
app.use("/v1/",memberRouter)

export default app;
