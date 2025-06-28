import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const orderService = {
  async findAll() {
    return prisma.order.findMany({
      include: {
        user: true,
      },
    });
  },

  async findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  },

  async create(data: Prisma.OrderCreateInput) {
    return prisma.order.create({ data });
  },

  async update(id: string, data: Prisma.OrderUpdateInput) {
    return prisma.order.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.order.delete({ where: { id } });
  },
};
