import { Router } from "express";
import { statController } from "../../../controllers/statsController";

const router = Router();

function asyncHandler(fn: any) {
  return (req: any, res: any, next: any) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}


router.get("/", asyncHandler(statController.getStats));

export default router;
