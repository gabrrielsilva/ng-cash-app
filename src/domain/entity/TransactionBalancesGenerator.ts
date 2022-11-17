import Account from './Account';
import Balance from './Balance';
import BalanceGeneratorCashIn from './BalanceGeneratorCashIn';
import BalanceGeneratorCashOut from './BalanceGeneratorCashOut';

export default class TransactionBalancesGenerator {
  constructor () {}

  async generate(debitedAccount: Account, creditedAccount: Account, value: number): Promise<TransactionBalances> {
    if (debitedAccount.balance < value) throw new Error('Insufficient balance');
    if (debitedAccount.id === creditedAccount.id) throw new Error('Cannot transact to self');
    const balanceGeneratorCashOut = new BalanceGeneratorCashOut();
    const newUserBalanceDebited = await balanceGeneratorCashOut.generate(debitedAccount.balance, value);
    const balanceGeneratorCashIn = new BalanceGeneratorCashIn();
    const newUserBalanceCredited = await balanceGeneratorCashIn.generate(creditedAccount.balance, value);
    return { newUserBalanceDebited, newUserBalanceCredited };
  }
}

type TransactionBalances = {
  newUserBalanceDebited: Balance,
  newUserBalanceCredited: Balance
}