import { promises } from 'fs'
import { join, resolve } from 'path'
import { inheritFiles, Project } from '.'

const { readdir, stat, readFile } = promises

describe('inheritFiles', () => {
  describe('mock', () => {
    const projects: Record<string, Project> = {
      noExtends: {
        'foo.txt': 'foo',
      },
      oneExtends: {
        '.extends': 'noExtends',
        'bar.txt': 'bar',
      },
      recursiveExtends: {
        '.extends': 'oneExtends',
        'baz.txt': 'baz',
      },
    }
    const resolveProject = (id: string) => Promise.resolve(projects[id])

    describe('no extends', () => {
      it('should render project', async () => {
        expect(
          await inheritFiles('noExtends', { resolveProject }),
        ).toMatchSnapshot()
      })
    })

    describe('one extends', () => {
      it('should render project', async () => {
        expect(
          await inheritFiles('oneExtends', { resolveProject }),
        ).toMatchSnapshot()
      })
    })

    describe('recursive extends', () => {
      it('should render project', async () => {
        expect(
          await inheritFiles('recursiveExtends', { resolveProject }),
        ).toMatchSnapshot()
      })
    })
  })

  describe('fs', () => {
    const templatesDirectory = resolve(
      __dirname,
      '../node_modules/@app/templates',
    )
    const examplesDirectory = resolve(
      __dirname,
      '../node_modules/@app/examples',
    )
    const subDirectoriesOf = async (path: string): Promise<string[]> => {
      const result: string[] = []

      const entries = await readdir(path)
      const forEachEntry = async (entry: string) => {
        const stats = await stat(resolve(path, entry))

        if (stats.isDirectory()) result.push(entry)
      }
      await Promise.all(entries.map(forEachEntry))

      return result
    }
    const readFilesRecursively = async (path: string): Promise<Project> => {
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
    const resolveProject = async (id: string): Promise<Project> => {
      const templates = await subDirectoriesOf(templatesDirectory)
      if (templates.includes(id))
        return readFilesRecursively(resolve(templatesDirectory, id))

      const examples = await subDirectoriesOf(examplesDirectory)
      if (examples.includes(id))
        return readFilesRecursively(resolve(examplesDirectory, id))

      throw new Error()
    }

    it.each([
      'simple-react',
      'react',
      'intro-hello-world',
      'intro-static-clock',
    ])('should render project %s', async (id) => {
      const files = await inheritFiles(id, { resolveProject })
      const importantBits: Project = {}
      for (const [filename, content] of Object.entries(files)) {
        if (filename.endsWith('.tsx')) importantBits[filename] = content
      }
      expect(importantBits).toMatchSnapshot()
    })
  })
})
