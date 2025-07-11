import { Router } from "express";
import { ServerReanderingRoutes } from "./server_reandering.routes";
import adminRoutes from "./api/dashboard/adminRoutes";
import userRoutes from "./api/dashboard/userRoutes";
import postRoutes from "./api/dashboard/postRoutes";
import productRoutes from "./api/dashboard/productRoutes";
import orderRoutes from "./api/dashboard/orderRoutes";
import categoryRoutes from "./api/dashboard/categoryRoutes";
import statRoutes from "./api/dashboard/statRoutes";
import uploadRoute from "./uploadRoute";

const app = Router();

app.use("/", ServerReanderingRoutes);
app.use("/api/v1/upload", uploadRoute);


app.use("/api/v1/admins", adminRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/stats", statRoutes);

export { app as MainRouter };
