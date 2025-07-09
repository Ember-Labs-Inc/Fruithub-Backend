import prisma from "../config/prisma";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export const seedAccounts = async () => {
  try {
    const userCount = await prisma.user.count();

    if (userCount > 0) {
      console.log("Users exist - skipping demo account creation");
      return;
    }

    const demoAccountsRaw = [
      {
        name: "Super Admin",
        email: "albertwatbin@gmail.com",
        phone: "+256-7898-74647",
        gender: "MALE" as const,
        role: "SUPER_ADMIN" as const,
        password: "superadmin",
      },
    ];

    const demoAccounts = await Promise.all(
      demoAccountsRaw.map(async (account) => ({
        ...account,
        password: await bcrypt.hash(account.password, SALT_ROUNDS),
      }))
    );

    await prisma.$transaction(
      demoAccounts.map((account) => prisma.user.create({ data: account }))
    );

    console.log("Seed account created successfully");
  } catch (error) {
    console.error("Error creating demo accounts:", error);
  }
};