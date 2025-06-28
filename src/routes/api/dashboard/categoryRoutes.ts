import { Router } from "express";
import { categoryController } from "../../../controllers/categoryController";

const router = Router();

function asyncHandler(fn: any) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post("/", asyncHandler(categoryController.create));
router.get("/", asyncHandler(categoryController.findAll));
router.get("/:id", asyncHandler(categoryController.findById));
router.put("/:id", asyncHandler(categoryController.update));
router.delete("/:id", asyncHandler(categoryController.delete));

export default router;