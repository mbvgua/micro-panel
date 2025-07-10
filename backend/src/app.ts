import express, { json } from "express";

import adminRouter from "./api-v1/routes/admin.routes";
import memberRouter from "./api-v1/routes/member.routes";
import microFinRouter from "./api-v1/routes/microfinance.routes";
import loanRouter from "./api-v1/routes/loans.routes";

const app = express();

// add body to responses
app.use(json());

// middleware
app.use("/v1/auth", adminRouter);
app.use("/v1", memberRouter);
app.use("/v1", microFinRouter);
app.use("/v1", loanRouter);

export default app;
