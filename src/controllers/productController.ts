import { Request, Response } from "express";
import { productService } from "../services/productService";

export const productController = {
  findAll: async (req: Request, res: Response) => {
    try {
      const products = await productService.findAll();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  findById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const product = await productService.findById(id);
      if (!product) return res.status(404).json({ error: "product not found" });
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const newproduct = await productService.create(req.body);
      res.status(201).json(newproduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const updatedproduct = await productService.update(id, req.body);
      res.json(updatedproduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await productService.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};