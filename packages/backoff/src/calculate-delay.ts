// https://github.com/tim-kos/node-retry/tree/b316bfc196a89504fa348bcb97b20eb55509a295#retrytimeoutsoptions
export const calculateDelay = (
  attempt: number,
  minTimeout: number,
  maxTimeout: number,
  factor: number,
  randomize: boolean,
): number => {
  const random = randomize ? Math.random() + 1 : 1

  return Math.min(
    Math.round(random * minTimeout * factor ** attempt),
    maxTimeout,
  )
}
