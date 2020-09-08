import { Project } from '@app/inherit-files'
import { promises } from 'fs'
import { join, resolve } from 'path'

const { readdir, stat, readFile } = promises

export const readFilesRecursively = async (path: string): Promise<Project> => {
  const result: Project = {}

  const entries = await readdir(path)
  const forEachEntry = async (entry: string) => {
    const entryPath = resolve(path, entry)
    const stats = await stat(entryPath)
    if (stats.isFile()) {
      const contents = await readFile(entryPath, 'utf8')
      result[entry] = contents
      return
    }

    if (stats.isDirectory()) {
      const recursive = await readFilesRecursively(entryPath)
      for (const [filename, contents] of Object.entries(recursive)) {
        result[join(entry, filename)] = contents
      }
      return
    }

    throw new Error()
  }
  await Promise.all(entries.map(forEachEntry))

  return result
}
