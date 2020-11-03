export interface ExampleYaml {
  project: string
  module?: string
  code?: boolean
  render?: boolean | string
  type?: 'component' | 'test'
  style?: Record<string, string> | null
}
