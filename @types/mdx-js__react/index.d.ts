import { ComponentType, FC } from 'react'

type Tag =
  | 'a'
  | 'blockquote'
  | 'code'
  | 'delete'
  | 'em'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'hr'
  | 'img'
  | 'inlineCode'
  | 'li'
  | 'ol'
  | 'p'
  | 'pre'
  | 'strong'
  | 'sup'
  | 'table'
  | 'td'
  | 'thematicBreak'
  | 'tr'
  | 'ul'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Components = Partial<Record<Tag | string, ComponentType<any>>>

export interface MDXProviderProps {
  components?: Components
}

export const MDXProvider: FC<MDXProviderProps>
