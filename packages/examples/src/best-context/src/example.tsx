import React, {
  createContext,
  CSSProperties,
  FC,
  ReactNode,
  useContext,
  useMemo,
} from 'react'

// #region global
export interface GlobalContextType {
  theme: 'dark' | 'light'
}
export const GlobalContext = createContext<GlobalContextType>({ theme: 'dark' })

export const WithGlobal: FC = () => {
  const { theme } = useContext(GlobalContext)
  const style = useMemo(
    (): CSSProperties => ({ color: theme === 'dark' ? '#f8f8f2' : '#282a36' }),
    [theme],
  )
  return <div style={style}>children</div>
}
// #endregion

//

// #region local
export const LocalContext = createContext<{ index: number }>(null!)

export const List: FC<{ items: ReactNode[] }> = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <LocalContext.Provider key={Math.random()} value={{ index }}>
          {item}
        </LocalContext.Provider>
      ))}
    </ul>
  )
}

export const NumberedItem: FC = ({ children }) => {
  const { index } = useContext(LocalContext)
  return (
    <li>
      ({index + 1}) {children}
    </li>
  )
}

export const UnnumberedItem: FC = ({ children }) => {
  return <li>{children}</li>
}

const items = [
  <UnnumberedItem>hello</UnnumberedItem>,
  <UnnumberedItem>world</UnnumberedItem>,
  <NumberedItem>hello</NumberedItem>,
  <NumberedItem>world</NumberedItem>,
]
export default <List items={items} />
// #endregion
