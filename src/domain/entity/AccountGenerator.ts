import crypto from 'node:crypto';
import Account from './Account';

export default class AccountGenerator {
  constructor () {}

  async generate(): Promise<Account> {
    const id = crypto.randomUUID();
    const balance = 100;
    return new Account(id, balance);
  }
}