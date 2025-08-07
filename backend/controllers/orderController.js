// controllers/orderController.js
const Order = require('../models/Order');
const mongoose = require('mongoose');

const totalAmountByUser = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: '$userId',
          totalSpent: { $sum: '$amount' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          _id: 0,
          userName: '$user.name',
          totalSpent: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const orderCountByProduct = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: '$product',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const usersWithOrders = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'userId',
          as: 'orders'
        }
      },
      {
        $match: { 'orders.0': { $exists: true } }
      },
      {
        $project: {
          name: 1,
          numberOfOrders: { $size: '$orders' },
          orders: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const monthlySales = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          totalSales: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          '_id.year': -1,
          '_id.month': -1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getOrdersByDateRange = async (req, res) => {
  const { start, end } = req.query;

  try {
    const orders = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(start),
            $lte: new Date(end)
          }
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const paginatedOrders = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  try {
    const orders = await Order.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limit }
    ]);

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getUserOrdersWithTotal = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $lookup: {
          from: 'orders',
          localField: '_id',
          foreignField: 'userId',
          as: 'orders'
        }
      },
      {
        $addFields: {
          totalSpent: { $sum: '$orders.amount' },
          orderCount: { $size: '$orders' }
        }
      },
      {
        $project: {
          name: 1,
          totalSpent: 1,
          orderCount: 1
        }
      },
      {
        $sort: { totalSpent: -1 }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getHighSpendingUsers = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: '$userId',
          totalSpent: { $sum: '$amount' }
        }
      },
      {
        $match: { totalSpent: { $gte: 1000 } }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $project: {
          userName: '$user.name',
          totalSpent: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
