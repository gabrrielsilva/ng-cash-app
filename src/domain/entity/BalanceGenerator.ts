import Balance from './Balance';

export default interface BalanceGenerator {
  generate(currentValue: number, transactValue: number): Promise<Balance>;
}