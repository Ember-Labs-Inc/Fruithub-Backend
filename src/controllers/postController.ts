import { Request, Response } from "express";
import { postService } from "../services/postService";

export const postController = {
  findAll: async (req: Request, res: Response) => {
    try {
      const posts = await postService.findAll();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  findById: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const post = await postService.findById(id);
      if (!post) return res.status(404).json({ error: "post not found" });
      res.json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const newpost = await postService.create(req.body);
      res.status(201).json(newpost);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const updatedpost = await postService.update(id, req.body);
      res.json(updatedpost);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      await postService.delete(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
};
