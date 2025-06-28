import { Request, Response } from "express";
import { orderService } from "../services/orderService";

export const orderController = {
  findAll: async (req: Request, res: Response) => {
    try {
      const orders = await orderService.findAll();
      res.json(orders);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  findById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const order = await orderService.findById(id);
      if (!order) return res.status(404).json({ error: "order not found" });
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const neworder = await orderService.create(req.body);
      res.status(201).json(neworder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const updatedorder = await orderService.update(id, req.body);
      res.json(updatedorder);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await orderService.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
