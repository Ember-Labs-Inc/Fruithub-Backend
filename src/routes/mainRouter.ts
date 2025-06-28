import { Router } from "express";
import { ServerReanderingRoutes } from "./server_reandering.routes";

const app = Router();

app.use("/", ServerReanderingRoutes);


export { app as MainRouter };
