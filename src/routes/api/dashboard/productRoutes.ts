import { Router } from "express";
import { productController } from "../../../controllers/productController";

const router = Router();

function asyncHandler(fn: any) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post("/", asyncHandler(productController.create));
router.get("/", asyncHandler(productController.findAll));
router.get("/:id", asyncHandler(productController.findById));
router.put("/:id", asyncHandler(productController.update));
router.delete("/:id", asyncHandler(productController.delete));

export default router;