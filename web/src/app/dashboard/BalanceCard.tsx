type BalanceCardProps = {
  balance: number
}

export const BalanceCard = ({ balance }: BalanceCardProps) => {  
  return (
    <div className='flex flex-col w-full'>
      <span className='text-4xl font-extrabold'>${ balance?.toFixed(2) }</span>
      <span className='text-lg text-gray-600'>Your balance</span>
    </div>
  )
}