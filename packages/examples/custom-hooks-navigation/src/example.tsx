import React, { FC, ReactNode, useCallback, useState } from 'react'
import classes from './example.module.css'
import { NavigationContextProvider, useNavigation } from './navigation'

export interface Tab {
  id: string
  title: string
  content: ReactNode
}

interface InternalTabButtonProps {
  activeTabId: string
  setActiveTabId: (id: string) => void
  tab: Tab
}
const InternalTabButton: FC<InternalTabButtonProps> = ({
  activeTabId,
  setActiveTabId,
  tab: { id, title },
}) => {
  const isActive = activeTabId === id

  return (
    <button
      type="button"
      className={classes.button}
      onClick={useCallback(() => setActiveTabId(id), [setActiveTabId, id])}
      {...useNavigation()}
    >
      {isActive ? '> ' : ''}
      {title}
    </button>
  )
}

export interface TabsProps {
  defaultTabId?: string
  tabs: Tab[]
}

export const Tabs: FC<TabsProps> = ({ defaultTabId, tabs }) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId || tabs[0].id)

  const tabButtons = tabs.map((tab) => (
    <InternalTabButton
      key={tab.id}
      activeTabId={activeTabId}
      setActiveTabId={setActiveTabId}
      tab={tab}
    />
  ))

  const [activeTab] = tabs.filter(({ id }) => id === activeTabId)

  return (
    <div>
      <div>
        <NavigationContextProvider>{tabButtons}</NavigationContextProvider>
      </div>
      <div>{activeTab.content}</div>
    </div>
  )
}

const tabs = [
  { id: 'hello', title: 'Hello', content: <p>hello</p> },
  { id: 'world', title: 'World', content: <p>world</p> },
  { id: 'tabs', title: 'Tabs', content: <p>tabs</p> },
  { id: 'example', title: 'Example', content: <p>example</p> },
]
export default (
  <>
    <label>
      focus a tab, then use arrow keys to navigate between them
      <br />
      <input placeholder="focus this, press tab" />
    </label>
    <Tabs defaultTabId="tabs" tabs={tabs} />
  </>
)
