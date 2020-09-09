import { CodesandboxFile } from './types'

export const sortFiles = (files: CodesandboxFile[]): void => {
  files.sort((l, r) => r.name.localeCompare(l.name))
}
