const express = require('express');
const router = express.Router();
const { totalAmountByUser, orderCountByProduct, usersWithOrders, monthlySales } = require('../controllers/orderController');

router.get('/total-spent', totalAmountByUser);
router.get('/product-count', orderCountByProduct);
router.get('/users-with-orders', usersWithOrders);
router.get('/monthly-sales', monthlySales);

module.exports = router;
