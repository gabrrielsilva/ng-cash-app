export default interface Connection {
  query <T>(statement: string, params?: any): Promise<T[]>;
  close (): Promise<void>;
}