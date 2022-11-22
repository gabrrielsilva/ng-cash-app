import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { BalanceCard } from './BalanceCard';
import { SendMoneyCard } from './SendMoneyCard';
import { TransactionsCard } from './TransactionsCard';

type Account = {
  id: string,
  balance: number
}

export type Transaction = {
  id: string,
  debitedaccountid: string,
  creditedaccountid: string,
  value: number,
  createdat: Date,
}

async function getBalance() {
  const nextCookies = cookies();
  const token = nextCookies.get('ng.token');
  if (!token) redirect('/');
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account`, {
    next: {
      revalidate: 10
    },
    headers: {
      Authorization: `Bearer ${token.value}`,
    }
  })
  const data = await response.json();  
  const account = data.account as Account;
  return account.balance;
}

async function getTransactions() {
  const nextCookies = cookies();
  const token = nextCookies.get('ng.token');
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token.value}`,
    }
  })
  const data = await response.json();
  const transactions = data.transactions as Transaction[];
  return transactions;
}

export default async function Dashboard () {
  const balance = await getBalance();
  const transactions = await getTransactions();
    
  return (
    <div className='grid w-full sm:grid-cols-2 sm:gap-10 sm:h-72' >
      <div className='flex flex-col justify-between h-full sm:divide-y'>
        <BalanceCard balance={balance} />
        <SendMoneyCard />
      </div>
      <div className='relative flex flex-col h-full overflow-hidden'>
        <TransactionsCard transactions={transactions} />
      </div>
    </div>
  )
}