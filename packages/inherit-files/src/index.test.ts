import { inheritFiles, Project } from '.'

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

describe('inheritFiles', () => {
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
