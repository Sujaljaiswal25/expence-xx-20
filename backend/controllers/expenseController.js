const Expense = require('../models/Expense');
const { CATEGORIES } = require('../utils/constants');


const getExpenses = async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;
    
    let query = { user: req.user._id };

    if (category) {
      query.category = category;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) {
        query.date.$gte = new Date(startDate);
      }
      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    
    res.json({
      success: true,
      count: expenses.length,
      data: expenses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createExpense = async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    if (!amount || !category || !date) {
      return res.status(400).json({ message: 'Please provide amount, category, and date' });
    }

    if (!CATEGORIES.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    const expense = await Expense.create({
      user: req.user._id,
      amount,
      category,
      date,
      note: note || ''
    });

    res.status(201).json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (req.body.category && !CATEGORIES.includes(req.body.category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ success: true, data: expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await expense.deleteOne();

    res.json({ success: true, message: 'Expense removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let matchQuery = { user: req.user._id };
    
    if (startDate || endDate) {
      matchQuery.date = {};
      if (startDate) matchQuery.date.$gte = new Date(startDate);
      if (endDate) matchQuery.date.$lte = new Date(endDate);
    }

    const totalResult = await Expense.aggregate([
      { $match: matchQuery },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalSpent = totalResult[0]?.total || 0;

    const categoryBreakdown = await Expense.aggregate([
      { $match: matchQuery },
      { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const monthlyBreakdown = await Expense.aggregate([
      { $match: { user: req.user._id, date: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const transactionCount = await Expense.countDocuments(matchQuery);

    res.json({
      success: true,
      data: {
        totalSpent: totalSpent.toFixed(2),
        transactionCount,
        categoryBreakdown: categoryBreakdown.map(item => ({
          category: item._id,
          total: item.total.toFixed(2),
          count: item.count
        })),
        monthlyBreakdown: monthlyBreakdown.map(item => ({
          month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
          total: item.total.toFixed(2),
          count: item.count
        }))
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
  getSummary
};