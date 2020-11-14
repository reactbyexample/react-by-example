import { inheritFiles, Project } from '@app/inherit-files'
import { promises } from 'fs'
import { dirname, resolve } from 'path'
import { readFilesRecursively } from './read-files-recursively'
import { subDirectories } from './sub-directories'

const { writeFile, mkdir } = promises

const TEST_PROJECT_SUFFIX = '-test'
const CREATE_TEST_PROJECT_FILENAME = '.test'
const getTestProjectExtends = (example: string) => `\
${example}
with-testing
`

export const main = async (
  templatesDirectory: string,
  examplesDirectory: string,
  outputDirectory: string,
): Promise<void> => {
  const examples = await subDirectories(examplesDirectory)
  const templates = await subDirectories(templatesDirectory)

  const resolveProject = async (id: string): Promise<Project> => {
    if (templates.includes(id))
      return readFilesRecursively(resolve(templatesDirectory, id))

    if (examples.includes(id))
      return readFilesRecursively(resolve(examplesDirectory, id))

    if (id.endsWith(TEST_PROJECT_SUFFIX))
      return {
        '.extends': getTestProjectExtends(
          id.slice(0, -TEST_PROJECT_SUFFIX.length),
        ),
      }

    throw new Error()
  }

  const writeExample = async (example: string, project: Project) => {
    const output = {
      name: example,
      files: Object.entries(project).map(([name, value]) => ({ name, value })),
    }

    await mkdir(resolve(outputDirectory), { recursive: true })
    await writeFile(
      resolve(outputDirectory, `${example}.json`),
      JSON.stringify(output, null, '  '),
    )

    const exampleOutputDirectory = resolve(outputDirectory, example)
    await mkdir(exampleOutputDirectory, { recursive: true })
    const writeEachFile = async ([name, value]: [string, string]) => {
      await mkdir(resolve(exampleOutputDirectory, dirname(name)), {
        recursive: true,
      })
      await writeFile(resolve(exampleOutputDirectory, name), value)
    }
    await Promise.all(Object.entries(project).map(writeEachFile))
  }

  const forEachExample = async (example: string) => {
    const project = await inheritFiles(example, { resolveProject })

    if (CREATE_TEST_PROJECT_FILENAME in project) {
      delete project[CREATE_TEST_PROJECT_FILENAME]

      const testProjectId = `${example}${TEST_PROJECT_SUFFIX}`
      const testProject = await inheritFiles(testProjectId, { resolveProject })
      delete testProject[CREATE_TEST_PROJECT_FILENAME]

      await writeExample(testProjectId, testProject)
    }

    await writeExample(example, project)
  }
  await Promise.all(examples.map(forEachExample))
}
