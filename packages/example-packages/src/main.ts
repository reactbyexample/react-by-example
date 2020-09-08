import { inheritFiles, Project } from '@app/inherit-files'
import { promises } from 'fs'
import { resolve } from 'path'
import { readFilesRecursively } from './read-files-recursively'
import { subDirectories } from './sub-directories'

const { writeFile, mkdir } = promises

export const main = async (
  templatesDirectory: string,
  examplesDirectory: string,
  outputDirectory: string,
): Promise<void> => {
  const examples = await subDirectories(examplesDirectory)

  const resolveProject = async (id: string): Promise<Project> => {
    const templates = await subDirectories(templatesDirectory)
    if (templates.includes(id))
      return readFilesRecursively(resolve(templatesDirectory, id))

    if (examples.includes(id))
      return readFilesRecursively(resolve(examplesDirectory, id))

    throw new Error()
  }

  const forEachExample = async (example: string) => {
    const project = await inheritFiles(example, { resolveProject })
    const output = {
      name: example,
      files: Object.entries(project).map(([name, value]) => ({ name, value })),
    }

    await mkdir(resolve(outputDirectory), { recursive: true })
    await writeFile(
      resolve(outputDirectory, `${example}.json`),
      JSON.stringify(output, null, '  '),
    )
  }
  await Promise.all(examples.map(forEachExample))
}
