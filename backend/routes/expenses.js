const express = require('express');
const router = express.Router();
const {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary
} = require('../controllers/expenseController');
const { protect } = require('../middleware/auth');

// Protect all routes
router.use(protect);

// Summary route must come before /:id
router.get('/summary/stats', getSummary);

router.route('/')
  .get(getExpenses)
  .post(createExpense);

router.route('/:id')
  .get(getExpense)
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;