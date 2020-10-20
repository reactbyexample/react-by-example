export interface BackoffArgs {
  maxRetries?: number
  factor?: number
  minTimeout?: number
  maxTimeout?: number
  randomize?: boolean
}
