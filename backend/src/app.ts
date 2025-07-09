import express, { json } from "express";

import adminRouter from "./api-v1/routes/admin.routes";
import memberRouter from "./api-v1/routes/member.routes";
import microFinRouter from "./api-v1/routes/microfinance.routes";

const app = express();

// add body to responses
app.use(json());
app.use("/v1/auth", adminRouter);
app.use("/v1", memberRouter);
app.use("/v1", microFinRouter);

export default app;
