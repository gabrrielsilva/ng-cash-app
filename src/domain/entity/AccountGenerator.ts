import Account from './Account';

export default class AccountGenerator {
  constructor () {}

  async generate(id: string): Promise<Account> {
    const balance = 100;
    return new Account(id, balance);
  }
}