import { CreateSchemaCustomizationArgs } from 'gatsby'

export const createSchemaCustomization = ({
  actions: { createTypes },
}: CreateSchemaCustomizationArgs): void => {
  createTypes(`
    type CodesandboxFile {
      name: String!
      value: String!
    }

    type Codesandbox implements Node {
      name: String!
      files: [CodesandboxFile!]!
      sandboxId: String!
    }
  `)
}
