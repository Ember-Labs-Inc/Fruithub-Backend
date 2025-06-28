const prisma = require('../prisma/client');

const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      posts: true,
      products: true,
      orders: true,
    },
  });
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      posts: true,
      products: true,
      orders: true,
    },
  });
};

const createUser = async (data) => {
  return await prisma.user.create({ data });
};

const updateUser = async (id, data) => {
  return await prisma.user.update({ where: { id }, data });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};