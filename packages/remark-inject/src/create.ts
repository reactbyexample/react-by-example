import { Node, Parent } from 'unist'
import { Create, ImportIdentifier } from './types'

export const createFactory = (root: Node): Create => {
  const defaultImport: Create['defaultImport'] = (target) => {
    interface NodeWithImports extends Parent {
      data: {
        imports: Partial<Record<string, ImportIdentifier>>
      }
    }
    if (!(root.data && root.data.imports)) {
      // eslint-disable-next-line no-param-reassign
      root.data = { ...root.data, imports: {} }
    }
    const {
      children,
      data: { imports },
    } = root as NodeWithImports

    const normalizedTarget = target.replace(/\\/g, '/')
    const importId = `${normalizedTarget}$default`

    const existing = imports[importId]
    if (existing) return existing

    const identifier = importId
      .replace(/[^a-z]/gi, '_')
      .replace(/_+/g, '_')
      .replace(/^_+/, '')
      .toUpperCase()

    children.unshift({
      type: 'import',
      value: `import ${identifier} from '${normalizedTarget}'`,
    })

    const result: ImportIdentifier = { identifier }
    imports[importId] = result
    return result
  }

  return { defaultImport }
}
