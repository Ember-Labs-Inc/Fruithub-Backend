import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const postService = {
  async findAll() {
    return prisma.post.findMany({
      include: {
        author: true,
        category: true,
      },
    });
  },

  async findById(id: string) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        category: true,
      },
    });
  },


  async create(data: Prisma.PostCreateInput) {
    return prisma.post.create({ data });
  },

  async update(id: string, data: Prisma.PostUpdateInput) {
    return prisma.post.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.post.delete({ where: { id } });
  },
};
