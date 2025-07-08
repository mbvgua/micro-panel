import express, { json } from "express";

const app = express();

// add body to responses
app.use(json());

export default app;
