import { promises } from 'fs'
import { resolve } from 'path'

const { readdir, stat } = promises

export const subDirectories = async (path: string): Promise<string[]> => {
  const result: string[] = []

  const entries = await readdir(path)
  const forEachEntry = async (entry: string) => {
    const stats = await stat(resolve(path, entry))

    if (stats.isDirectory()) result.push(entry)
  }
  await Promise.all(entries.map(forEachEntry))

  return result
}
