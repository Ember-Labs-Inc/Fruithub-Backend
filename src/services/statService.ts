import prisma from "../config/prisma";

export const statService = {
  async getDashboardStats() {
    // Get categories and related products
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

    // Dummy data - replace with actual queries in production
    const totalCustomers = await prisma.user.count();
    const activeUsers = await prisma.user.count({
      where: {
        /* your logic */
      },
    });
    const vipCustomers = 24; // Replace with real query
    const avgCustomerValue = 12500; // Replace with real computation

    const orderStatusCounts = await prisma.order.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    const orderStats = {
      pending: 0,
      processing: 0,
      delivered: 0,
      cancelled: 0,
    };

    for (const status of orderStatusCounts) {
      const key = status.status.toLowerCase(); // e.g., "pending"
      if (orderStats.hasOwnProperty(key)) {
        orderStats[key as keyof typeof orderStats] = status._count.status;
      }
    }

    const quickStats = [
      {
        title: "Total Sales",
        value: "$12.6K",
        change: "+5%",
        changeType: "increase",
        icon: "💰",
      },
      {
        title: "Avg Order Value",
        value: "$65.32",
        change: "-2%",
        changeType: "warning",
        icon: "📦",
      },
      {
        title: "Refund Rate",
        value: "1.5%",
        change: "+0.2%",
        changeType: "neutral",
        icon: "🔄",
      },
      {
        title: "Returning Customers",
        value: "56",
        change: "+7%",
        changeType: "increase",
        icon: "👥",
      },
    ];

    return {
      totalCustomers,
      activeUsers,
      vipCustomers,
      avgCustomerValue,
      orderStats,
      categoryStats: {
        totalCategories,
        totalProducts,
        largestCategory: {
          name: largestCategory.name,
          productCount: largestCategory.products.length,
        },
        averagePerCategory,
      },
      quickStats,
    };
  },
};
