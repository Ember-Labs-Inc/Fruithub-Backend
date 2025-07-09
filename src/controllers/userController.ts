import { Request, Response } from "express";
import { userService } from "../services/userService";

export const userController = {
  findAll: async (req: Request, res: Response) => {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  findById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await userService.findById(id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    if (user) {
      res.json(user);
    } else if(!user) {
      res.status(404).json({message: "Please create an account to proceed"})
    } else {
      res.status(404).json({ message: "Invalid email or password" });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const newUser = await userService.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const updatedUser = await userService.update(id, req.body);
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await userService.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};