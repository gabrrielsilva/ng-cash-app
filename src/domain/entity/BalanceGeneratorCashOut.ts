import Balance from './Balance';
import BalanceGenerator from './BalanceGenerator';

export default class BalanceGeneratorCashOut implements BalanceGenerator {
  async generate(currentBalance: number, transactValue: number): Promise<Balance> {
    if (currentBalance < transactValue) throw new Error('Insufficient balance');
    return { value: currentBalance - transactValue };
  }
}