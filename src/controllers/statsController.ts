import { Request, Response } from "express";
import { statService } from "../services/statService";

export const statController = {
  getStats: async (req: Request, res: Response) => {
    try {
      const stats = await statService.getDashboardStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
