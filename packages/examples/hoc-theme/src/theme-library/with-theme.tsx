import React, { Component, ComponentType, ReactNode } from 'react'
import { ThemeContext, ThemeContextType } from './internal/theme-context'

export interface PropsWithTheme {
  theme: ThemeContextType
}
export type PropsWithoutTheme<T> = Omit<T, 'theme'>

export const withTheme = <TProps extends PropsWithTheme>(
  WrappedComponent: ComponentType<TProps>,
): ComponentType<PropsWithoutTheme<TProps>> => {
  type WithThemeComponentProps = PropsWithoutTheme<TProps>

  return class WithThemeComponent extends Component<WithThemeComponentProps> {
    static displayName = `withTheme(${
      WrappedComponent.displayName || WrappedComponent.name || 'Component'
    })`

    private themeContextConsumer = (theme: ThemeContextType): ReactNode => {
      const props = { ...this.props, theme } as TProps
      return <WrappedComponent {...props} />
    }

    render = (): ReactNode => {
      return (
        <ThemeContext.Consumer>
          {this.themeContextConsumer}
        </ThemeContext.Consumer>
      )
    }
  }
}
