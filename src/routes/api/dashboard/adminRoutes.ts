import { Router } from "express";
import { adminController } from "../../../controllers/adminController";

const router = Router();

function asyncHandler(fn: any) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post("/", asyncHandler(adminController.create));
router.get("/", asyncHandler(adminController.findAll));
router.get("/:id", asyncHandler(adminController.findById));
router.put("/:id", asyncHandler(adminController.update));
router.delete("/:id", asyncHandler(adminController.delete));
router.post("/login", asyncHandler(adminController.login));

export default router;
