const Income = require('../models/Income');
const Expense = require('../models/Expense');
const { Types } = require('mongoose');

// Dashboard data
exports.getDashboardData = async (req, res) => {
    try {
        // Get user ID from the request (added by the protect middleware)
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        // Fetch total income for the user
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // Fetch total expenses for the user
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        // Get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // Calculate total income for the last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });

        // Calculate total expenses for the last 30 days
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch last 5 transactions (income + expense) and sort them by date
        const lastIncomeTransactions = await Income.find({ userId })
            .sort({ date: -1 })
            .limit(5)
            .lean();

        const lastExpenseTransactions = await Expense.find({ userId })
            .sort({ date: -1 })
            .limit(5)
            .lean();

        // Add "type" to each transaction to differentiate between income and expense
        const lastTransactions = [
            ...lastIncomeTransactions.map((txn) => ({ ...txn, type: 'income' })),
            ...lastExpenseTransactions.map((txn) => ({ ...txn, type: 'expense' }))
        ].sort((a, b) => b.date - a.date); // Sort latest first

        // Send the response
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions
            },
            recentTransactions: lastTransactions
        });

    } catch (error) {
        // Handle server errors
        res.status(500).json({
            message: 'Server Error.',
            error
        });
    }
};
