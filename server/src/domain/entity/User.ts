export default class User {
  constructor (
    readonly id: string,
    readonly username: string, 
    readonly password: string,
    readonly accountId: string,
  ) {
    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long')
    }
    if (password) {
      if (password.length < 8 || !/[0-9]/gm.test(password) || !/[A-Z]/gm.test(password)) {
        throw new Error('Password must be at least 8 characters long, a number and an uppercase letter')
      }
    }
  }
}