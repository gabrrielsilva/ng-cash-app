import Balance from './Balance';
import BalanceGenerator from './BalanceGenerator';

export default class BalanceGeneratorCashIn implements BalanceGenerator {
  async generate(currentBalance: number, transactValue: number): Promise<Balance> {
    return { value: currentBalance + transactValue };
  }
}