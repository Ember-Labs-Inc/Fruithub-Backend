import { Router } from "express";
import { orderController } from "../../../controllers/orderController";

const router = Router();

function asyncHandler(fn: any) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post("/", asyncHandler(orderController.create));
router.get("/", asyncHandler(orderController.findAll));
router.get("/:id", asyncHandler(orderController.findById));
router.put("/:id", asyncHandler(orderController.update));
router.delete("/:id", asyncHandler(orderController.delete));

export default router;