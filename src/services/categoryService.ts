import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";

export const categoryService = {
  async findAll() {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
        posts: true,
      },
    });

    return categories.map((category) => ({
      ...category,
      productCount: category.products.length,
    }));
  },

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
        posts: true,
      },
    });

    if (!category) return null;

    return {
      ...category,
      productCount: category.products.length,
    };
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

  async getStats() {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });

    const totalCategories = categories.length;
    const totalProducts = categories.reduce(
      (sum, category) => sum + category.products.length,
      0
    );

    const largestCategory = categories.reduce((prev, current) =>
      current.products.length > prev.products.length ? current : prev
    );

    const averagePerCategory =
      totalCategories > 0 ? Math.round(totalProducts / totalCategories) : 0;

    return {
      totalCategories,
      totalProducts,
      largestCategory: {
        id: largestCategory.id,
        name: largestCategory.name,
        productCount: largestCategory.products.length,
      },
      averagePerCategory,
    };
  },
};
