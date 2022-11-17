import Balance from './Balance';
import BalanceGenerator from './BalanceGenerator';

export default class BalanceGeneratorCashOut implements BalanceGenerator {
  async generate(currentValue: number, transactValue: number): Promise<Balance> {
    return { value: currentValue - transactValue };
  }
}