import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const adminService = {
  async findAll() {
    return prisma.admin.findMany();
  },

  async findById(id: string) {
    return prisma.admin.findUnique({ where: { id } });
  },

  async login(email: string, password: string) {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) throw new Error("Admin not found");

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) throw new Error("Invalid credentials");

    // ✅ Update lastLogin timestamp
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    const { password: _, ...adminWithoutPassword } = admin;
    return adminWithoutPassword;
  },

  async create(data: any) {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    return prisma.admin.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  },

  async update(id: string, data: Prisma.AdminUpdateInput) {
    return prisma.admin.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.admin.delete({ where: { id } });
  },
};
