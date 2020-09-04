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

  const parentProject = await inheritFiles(extendsFileContent, args)

  const extendedProject = {
    ...parentProject,
    ...project,
  }
  delete extendedProject[extendsFile]

  return extendedProject
}
