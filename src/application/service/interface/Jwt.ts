export default interface Jwt {
  sign (payload: object, expiresIn: string): Promise<string>;
  validate (token: string): Promise<{ [key: string]: any }>
}