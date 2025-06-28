const getAllCategories = async () => {
  return await prisma.category.findMany({
    include: {
      products: true,
      posts: true,
    },
  });
};

const getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: { id },
    include: {
      products: true,
      posts: true,
    },
  });
};

const createCategory = async (data) => {
  return await prisma.category.create({ data });
};

const updateCategory = async (id, data) => {
  return await prisma.category.update({ where: { id }, data });
};

const deleteCategory = async (id) => {
  return await prisma.category.delete({ where: { id } });
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};