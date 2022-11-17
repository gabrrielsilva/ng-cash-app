export default class Transaction {
  constructor (
    readonly id: string,
    readonly debitedaccountid: string,
    readonly creditedaccountid: string,
    readonly value: number,
    readonly createdat: Date
  ) {}
}