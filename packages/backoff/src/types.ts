export interface BackoffArgs {
  maxAttempts?: number
  factor?: number
  minTimeout?: number
  maxTimeout?: number
  randomize?: boolean
}
