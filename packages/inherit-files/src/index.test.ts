import { inheritFiles, Project } from '.'

describe('inheritFiles', () => {
  describe('mock', () => {
    const projects: Record<string, Project> = {
      noExtends: {
        'foo.txt': 'foo',
      },
      toolMixin: {
        '.tool.rc': 'configuration file',
      },
      oneExtends: {
        '.extends': 'noExtends',
        'bar.txt': 'bar',
      },
      recursiveExtends: {
        '.extends': 'oneExtends',
        'baz.txt': 'baz',
      },
      multipleExtends: {
        '.extends': 'noExtends\ntoolMixin',
      },
    }
    const resolveProject = (id: string) => Promise.resolve(projects[id])

    describe.each([
      ['no extends', 'noExtends'],
      ['one extends', 'oneExtends'],
      ['recursive extends', 'recursiveExtends'],
      ['multiple extends', 'multipleExtends'],
    ])('%s', (_, id) => {
      it('should render project', async () => {
        expect(await inheritFiles(id, { resolveProject })).toMatchSnapshot()
      })
    })
  })
})
