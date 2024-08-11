export interface Controller<T = any> {
  handle(request: T, reply: T): Promise<void>
}
