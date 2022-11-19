import Balance from './Balance';

export default interface BalanceGenerator {
  generate(currentBalance: number, transactValue: number): Promise<Balance>;
}