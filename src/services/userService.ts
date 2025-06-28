import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const userService = {
  async findAll() {
    return prisma.user.findMany({
      include: {
        posts: true,
        products: true,
        orders: true,
      },
    });
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        posts: true,
        products: true,
        orders: true,
      },
    });
  },

  login: async (email: string, password: string) => {
    return prisma.user.findUnique({
      where: { email, password },
      include: {
        posts: true,
        products: true,
        orders: true,
      },
    });
  },

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({ data });
  },

  async update(id: string, data: Prisma.UserUpdateInput) {
    return prisma.user.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  },
};
