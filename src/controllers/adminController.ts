import { Request, Response } from "express";
import { adminService } from "../services/adminService";

export const adminController = {
  findAll: async (req: Request, res: Response) => {
    try {
      const admins = await adminService.findAll();
      res.json(admins);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  findById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const admin = await adminService.findById(id);
      if (!admin) return res.status(404).json({ error: "Admin not found" });
      res.json(admin);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const admin = await adminService.login(email, password);
    if (admin) {
      res.json(admin);
    } else if(!admin) {
      res.status(404).json({message: "Please register an account with management system first."});
    } else {
      res.status(404).json({ message: "Invalid email or password" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const newUser = await adminService.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const updatedUser = await adminService.update(id, req.body);
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await adminService.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};