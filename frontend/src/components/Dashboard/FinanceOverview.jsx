import React from 'react'
import CustomPieCart from '../Charts/CustomPieCart'

const COLORS = ['#875CF5', '#FA2C37', '#FF6900']

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {

  const balanceData = [
    {name: 'Total Balance', amount: totalBalance}, 
    {name: 'Total Expenses', amount: totalExpense}, 
    {name: 'Total Income', amount: totalIncome}
  ]

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Financial Overview</h5>
      </div>

      <CustomPieCart
        data={balanceData}
        label='Total Balance'
        totalAmount={`$${totalBalance}`}
        color={COLORS}
        showTextAnchor
      />

    </div>
  )
}

export default FinanceOverview

// 2.45