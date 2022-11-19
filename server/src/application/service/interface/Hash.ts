export default interface Hash {
  hash (plainText: string, salt: number): Promise<string>;
  compare (plainText: string, encrypted: string): Promise<boolean>
}