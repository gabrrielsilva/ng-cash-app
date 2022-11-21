import { CashIcon } from '@heroicons/react/solid'

export const TransactionsHeader = () => {
  return (
    <header className='flex items-center gap-3'>
      <CashIcon className='w-6 h-6 text-yellow-500' />
      <span className='text-lg font-bold text-gray-600'>Transactions</span>
    </header>
  )
}