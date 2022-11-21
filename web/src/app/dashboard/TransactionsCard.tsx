import { Transaction } from './page'

type TransactionsCardProps = {
  accountId: string,
  transactions: Transaction[]
}

export const TransactionsCard = ({ accountId, transactions }: TransactionsCardProps) => {
  const transactionsSortedByDate = transactions.sort(function (a, b) {
    return new Date(b.createdat).getTime() - new Date(a.createdat).getTime();
  })

  return (
    <div className='w-full max-h-full space-y-5 overflow-y-scroll'>
      <div className='relative overflow-hidden'>
        {transactionsSortedByDate.map(transaction => (
          <div className='flex flex-col my-5' key={transaction.id}>
            {transaction.debitedaccountid === accountId ? (
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
  )
}