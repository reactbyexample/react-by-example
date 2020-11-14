import React, { Component, FC, ReactNode } from 'react'
import {
  DarkTheme,
  LightTheme,
  PropsWithTheme,
  withTheme,
} from './theme-library'

interface InternalThemedParagraphProps extends PropsWithTheme {
  children: ReactNode
}
class InternalThemedParagraph extends Component<InternalThemedParagraphProps> {
  componentDidMount = () => {
    // eslint-disable-next-line no-console
    console.log(this.props.theme)
  }

  render = () => {
    const {
      theme: {
        color: { foreground },
      },
      children,
    } = this.props
    return <p style={{ color: foreground }}>{children}</p>
  }
}
export const ThemedParagraph = withTheme(InternalThemedParagraph)

interface InternalThemedCardProps extends PropsWithTheme {
  children: ReactNode
}
const InternalThemedCard: FC<InternalThemedCardProps> = ({
  theme: {
    color: { background },
  },
  children,
}) => {
  return <div style={{ backgroundColor: background }}>{children}</div>
}
export const ThemedCard = withTheme(InternalThemedCard)

export default (
  <>
    <DarkTheme>
      <ThemedCard>
        <ThemedParagraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsum
          sapiente ut pariatur. Aliquam suscipit consequuntur similique repellat
          praesentium eos odit. Ad ipsum voluptatibus natus dignissimos rerum.
          Laborum, molestias temporibus?
        </ThemedParagraph>
        <ThemedParagraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsum
          sapiente ut pariatur. Aliquam suscipit consequuntur similique repellat
          praesentium eos odit. Ad ipsum voluptatibus natus dignissimos rerum.
          Laborum, molestias temporibus?
        </ThemedParagraph>
      </ThemedCard>
    </DarkTheme>
    <LightTheme>
      <ThemedCard>
        <ThemedParagraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsum
          sapiente ut pariatur. Aliquam suscipit consequuntur similique repellat
          praesentium eos odit. Ad ipsum voluptatibus natus dignissimos rerum.
          Laborum, molestias temporibus?
        </ThemedParagraph>
        <ThemedParagraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta ipsum
          sapiente ut pariatur. Aliquam suscipit consequuntur similique repellat
          praesentium eos odit. Ad ipsum voluptatibus natus dignissimos rerum.
          Laborum, molestias temporibus?
        </ThemedParagraph>
      </ThemedCard>
    </LightTheme>
  </>
)
