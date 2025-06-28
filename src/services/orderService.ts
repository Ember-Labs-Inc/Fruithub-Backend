const getAllOrders = async () => {
  return await prisma.order.findMany({
    include: {
      user: true,
      items: true,
    },
  });
};

const getOrderById = async (id) => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: true,
    },
  });
};

const createOrder = async (data) => {
  return await prisma.order.create({ data });
};

const updateOrder = async (id, data) => {
  return await prisma.order.update({ where: { id }, data });
};

const deleteOrder = async (id) => {
  return await prisma.order.delete({ where: { id } });
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};