import React, { createContext, FC, useContext } from 'react'
import classes from './example.module.css'

const Box: FC<{ color: string; dashed?: boolean }> = ({
  color,
  dashed,
  children,
}) => (
  <div
    className={classes.box}
    style={{ borderColor: color, borderStyle: dashed ? 'dashed' : 'solid' }}
  >
    {children}
  </div>
)

const Context = createContext<string>('default')
const ProvidesContext: FC<{ color: string }> = ({ color, children }) => (
  <Box color={color}>
    <pre>providing value: `{color}`</pre>
    <Context.Provider value={color}>{children}</Context.Provider>
  </Box>
)
const RendersContext: FC = () => {
  const value = useContext(Context)
  return <pre>using value: `{value}`</pre>
}

export default (
  <>
    <p>default value is used when there is no provider</p>
    <RendersContext />
    {/* default */}

    <ProvidesContext color="#ff5555">
      <RendersContext />
      {/* #ff5555 */}

      <Box color="#50fa7b" dashed>
        <p>value pierces component boundaries</p>
        <RendersContext />
        {/* #ff5555 */}

        <ProvidesContext color="#8be9fd">
          <p>providers can be nested</p>
          <p>closest value is used</p>
          <RendersContext />
          {/* #8be9fd */}
        </ProvidesContext>
      </Box>
    </ProvidesContext>
  </>
)
