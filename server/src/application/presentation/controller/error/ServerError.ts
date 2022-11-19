export class ServerError extends Error {
  constructor (reason: string) {
    super();
    this.name = 'ServerError';
    this.message = reason;
  }
}
