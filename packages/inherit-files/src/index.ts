export interface Project {
  [filename: string]: string
}

export interface InheritFilesArgs {
  resolveProject: (id: string) => Promise<Project>
  extendsFile?: string
}

export const inheritFiles = async (
  projectId: string,
  args: InheritFilesArgs,
): Promise<Project> => {
  const { resolveProject, extendsFile = '.extends' } = args

  const project = await resolveProject(projectId)

  const extendsFileContent = project[extendsFile]
  if (!extendsFileContent) return project

  const extendsProjects = await Promise.all(
    extendsFileContent
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((id) => inheritFiles(id, args)),
  )

  const inheritedFiles = extendsProjects.reduce(
    (acc, curr) => ({ ...acc, ...curr }),
    {},
  )

  const extendedProject = {
    ...inheritedFiles,
    ...project,
  }
  delete extendedProject[extendsFile]

  return extendedProject
}
