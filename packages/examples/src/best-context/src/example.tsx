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

// #region local
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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

const ListItem: FC = ({ children }) => {
  const { index } = useContext(LocalContext)
  return (
    <li>
      ({index + 1}) {children}
    </li>
  )
}

const items = [<ListItem>hello</ListItem>, <ListItem>world</ListItem>]
export default <List items={items} />
// #endregion
