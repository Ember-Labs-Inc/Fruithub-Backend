import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { ProductInput } from "types/productInput";

export const productService = {
  async findAll() {
    return prisma.product.findMany({
      include: {
        category: true,
        orderItems: true,
      },
    });
  },

  async findById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        orderItems: true,
      },
    });
  },

  async create(data: ProductInput) {
    const {
      categoryId,
      createdById,
      ...rest
    } = data;

    return prisma.product.create({
      data: {
        ...rest,
        category: {
          connect: { id: categoryId },
        },
        createdBy: {
          connect: { id: createdById },
        },
      },
    });
  },

  async update(id: string, data: Prisma.ProductUpdateInput) {
    return prisma.product.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  },
};