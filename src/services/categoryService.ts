import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const categoryService = {
  async findAll() {
    return prisma.category.findMany({
      include: {
        products: true,
        posts: true,
      },
    });
  },

  async findById(id: string) {
    return prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
        posts: true,
      },
    });
  },


  async create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({ data });
  },

  async update(id: string, data: Prisma.CategoryUpdateInput) {
    return prisma.category.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.category.delete({ where: { id } });
  },
};
