export default class Transaction {
  constructor (
    readonly id: string,
    readonly debitedAccountId: string,
    readonly creditedAccountId: string,
    readonly value: number,
    readonly createdAt: Date
  ) {
    if (debitedAccountId === creditedAccountId) throw new Error('Cannot transact to self');
  }
}