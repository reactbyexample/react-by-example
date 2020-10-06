export const assertNonNull = <T>(value: T | null | undefined): T => {
  if (value == null) throw new Error()
  return value
}
