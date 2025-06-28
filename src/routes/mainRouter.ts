import { Router } from "express";
import { ServerReanderingRoutes } from "./server_reandering.routes";
import userRoutes from "./api/dashboard/userRoutes";
import postRoutes from "./api/dashboard/postRoutes";
import productRoutes from "./api/dashboard/productRoutes";
import orderRoutes from "./api/dashboard/orderRoutes";
import categoryRoutes from "./api/dashboard/categoryRoutes";

const app = Router();

app.use("/", ServerReanderingRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);

export { app as MainRouter };
