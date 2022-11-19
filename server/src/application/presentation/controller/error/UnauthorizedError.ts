export class UnauthorizedError extends Error implements ControllerError {
  constructor () {
    super('Invalid token or not provided');
    this.name = 'UnauthorizedError';
  }
}
