'use client'

import { CalendarIcon, CashIcon, MinusCircleIcon, PlusCircleIcon } from '@heroicons/react/solid'
import { useContext, useEffect, useState } from 'react'
import { Button } from '../../component/Button'
import { AuthContext } from '../../context/AuthContext'
import { Transaction } from './page'

type TransactionsCardProps = {
  transactions: Transaction[]
}

export const TransactionsCard = ({ transactions }: TransactionsCardProps) => {
  const { user } = useContext(AuthContext);
  const [transactionsState, setTransactionsState] = useState(transactions);
  const [filter, setFilter] = useState<'date' | 'cashIn' | 'cashOut'>('date');

  const transactionsSortedByDate = transactions.sort(function (a, b) { return new Date(b.createdat).getTime() - new Date(a.createdat).getTime() });
  const transactionsSortedByCashIn = transactions.filter(transaction => transaction.debitedaccountid !== user?.accountId);
  const transactionsSortedByCashOut = transactions.filter(transaction => transaction.debitedaccountid === user?.accountId);

  useEffect(() => {
    setTransactionsState(filter === 'cashIn' ? transactionsSortedByCashIn : filter === 'cashOut' ? transactionsSortedByCashOut : transactionsSortedByDate);
  }, [filter, transactionsSortedByDate, transactionsSortedByCashIn, transactionsSortedByCashOut])

  return (
    <>
      <header className='flex items-center justify-between gap-3'>
        <div className='flex items-center'>
          <CashIcon className='w-6 h-6 mr-2 text-yellow-500' />
          <span className='text-lg font-bold text-gray-600'>Transactions</span>
        </div>
        <div className='flex items-center'>
          <span className='mr-2 text-sm font-semibold'>Filter by:</span>
          <Button type='button' icon={CalendarIcon} extraStyles='text-blue-500' onClick={() => setFilter('date')} />
          <Button type='button' icon={PlusCircleIcon} extraStyles='text-green-500' onClick={() => setFilter('cashIn')} />
          <Button type='button' icon={MinusCircleIcon} extraStyles='text-red-500' onClick={() => setFilter('cashOut')} />
        </div>
      </header>
      <div className='w-full max-h-full overflow-y-scroll'>
        <div className='space-y-5'>
          {transactionsState.map(transaction => (
            <div className='flex flex-col my-5' key={transaction.id}>
              {transaction.debitedaccountid === user?.accountId ? (
                <span className='text-xl font-semibold text-red-600'> -${transaction.value}</span>
              ): (
                <span className='text-xl font-semibold text-green-600'> +${transaction.value}</span>
              )}
              <span className='text-sm'>Sent to: {transaction.debitedaccountid}</span>
              <span className='text-sm'>on: {new Date(transaction.createdat).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}