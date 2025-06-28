import { Router } from "express";
import { postController } from "../../../controllers/postController";

const router = Router();

function asyncHandler(fn: any) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.post("/", asyncHandler(postController.create));
router.get("/", asyncHandler(postController.findAll));
router.get("/:id", asyncHandler(postController.findById));
router.put("/:id", asyncHandler(postController.update));
router.delete("/:id", asyncHandler(postController.delete));

export default router;