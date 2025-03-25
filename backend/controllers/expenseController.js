const User = require('../models/User')
const xlsx = require('xlsx');
const Expense = require('../models/Expense')

// Add Expense source 

exports.addExpense = async (req, res) => {
    const userId = req.user.id ; 

    try{
        const {icon, category, amount, date} = req.body ; 

        if(!category || !amount || !date){
            return res.status(400).json({
                message: 'All fields are required.'
            })
        }

        const newExpense = new Expense({
            userId, 
            icon, 
            category, 
            amount, 
            date: new Date(date)
        })

        await newExpense.save()

        res.status(200).json(newExpense)

    }catch(error){
        res.status(500).json({
            message: 'Server error. '
        })
    }
}

// Get all Expense source 

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id ; 

    try{
        const expense = await Expense.find({userId}).sort({date: -1}) ; 
        res.json(expense) ; 
    }catch(error){
        res.status(500).json({
            message: 'Server error.'
        })
    }
}

// Delete Expense source 

exports.deleteExpense = async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id) ; 

        res.json({
            message: "Expense deleted successfully."
        })
    }catch(error){
        res.status(500).json({
            message: "Server error"
        })
    }
}

// Download excel 

// exports.downloadExpenseExcel = async (req, res) => {

//     const userId = req.user.id ; 

//     try{
//         const expense = await Expense.find({userId}).sort({date: -1})

//         // Prepare data for excel 

//         const data = expense.map((item) => ({
//             Category: item.category, 
//             Amount: item.amount, 
//             Date: item.date 
//         }))

//         const wb = xlsx.utils.book_new() ;  // create a new excel workbook 
//         const ws = xlsx.utils.json_to_sheet(data) ; // convert data into the worksheet 
//         xlsx.utils.book_append_sheet(wb, ws, 'Expense') ; 



//         xlsx.writeFile(wb, 'expense_details.xlsx')

//         res.download("expense_details.xlsx")

//     }catch(error){
//         res.status(500).json({
//             message: 'Download failed', 
//             error: error.message 
//         })
//     }
// }

exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    // Prepare data for excel
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split('T')[0], // Format date properly
    }));

    const wb = xlsx.utils.book_new(); // create a new excel workbook
    const ws = xlsx.utils.json_to_sheet(data); // convert data into the worksheet
    xlsx.utils.book_append_sheet(wb, ws, 'Expense');

    // Write workbook to buffer
    const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=expense_details.xlsx');

    res.send(buffer);
  } catch (error) {
    res.status(500).json({
      message: 'Download failed',
      error: error.message,
    });
  }
};



  

