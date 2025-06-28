const prisma = require("../generated/prisma/client");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.Category.findMany({
      include: { category: true },
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

exports.createCategory = async (req, res) => {
  const { name, description, price, stock, categoryId, imageUrl } = req.body;
  try {
    const Category = await prisma.Category.create({
      data: { name, description, price, stock, categoryId, imageUrl },
    });
    res.status(201).json(Category);
  } catch (error) {
    res.status(500).json({ message: "Error creating Category", error });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const Category = await prisma.Category.findUnique({
      where: { id: req.params.id },
      include: { category: true },
    });
    if (!Category) return res.status(404).json({ message: "Not found" });
    res.json(Category);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updated = await prisma.Category.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await prisma.Category.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error });
  }
};
