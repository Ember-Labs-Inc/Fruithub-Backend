import { Request, Response } from "express";
import { categoryService } from "../services/categoryService";

export const categoryController = {
  findAll: async (req: Request, res: Response) => {
    try {
      const categorys = await categoryService.findAll();
      res.json(categorys);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  findById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const category = await categoryService.findById(id);
      if (!category)
        return res.status(404).json({ error: "category not found" });
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      console.log("Create category payload:", req.body); // ✅
      const newcategory = await categoryService.create(req.body);
      res.status(201).json(newcategory);
    } catch (err) {
      console.error("Create category error:", err); // ✅
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const updatedcategory = await categoryService.update(id, req.body);
      res.json(updatedcategory);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await categoryService.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getStats: async (req: Request, res: Response) => {
    try {
      const stats = await categoryService.getStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
