export const filterNodeModules = (files: string[]): string[] => {
  return files.filter((file) => !/node_modules/.test(file))
}
