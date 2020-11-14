import React, { FC, ReactNode, useCallback, useState } from 'react'
import classes from './example.module.css'
import { NavigationContextProvider, useNavigation } from './navigation'

export interface AccordionItem {
  id: string
  title: string
  content: ReactNode
}

interface InternalAccordionItemProps {
  activeItemIds: Set<string>
  toggle: (id: string) => void
  item: AccordionItem
}

const InternalAccordionItem: FC<InternalAccordionItemProps> = ({
  activeItemIds,
  toggle,
  item: { id, title, content },
}) => {
  const isActive = activeItemIds.has(id)
  return (
    <div>
      <button
        type="button"
        className={classes.button}
        onClick={useCallback(() => toggle(id), [toggle, id])}
        {...useNavigation()}
      >
        {isActive ? '🔽' : '🔼'} {title}
      </button>
      {isActive && <div>{content}</div>}
    </div>
  )
}

export interface AccordionProps {
  items: AccordionItem[]
}

export const Accordion: FC<AccordionProps> = ({ items }) => {
  const [activeItemIds, setActiveItemIds] = useState(new Set<string>())

  const toggle = useCallback((id: string) => {
    setActiveItemIds((current) => {
      const nextItemIds = new Set(current)
      if (nextItemIds.has(id)) {
        nextItemIds.delete(id)
      } else {
        nextItemIds.add(id)
      }
      return nextItemIds
    })
  }, [])

  return (
    <div>
      <NavigationContextProvider>
        {items.map((item) => (
          <InternalAccordionItem
            key={item.id}
            activeItemIds={activeItemIds}
            toggle={toggle}
            item={item}
          />
        ))}
      </NavigationContextProvider>
    </div>
  )
}

const items = [
  { id: 'hello', title: 'Hello', content: <p>hello</p> },
  { id: 'world', title: 'World', content: <p>world</p> },
  { id: 'accordion', title: 'Accordion', content: <p>accordion</p> },
  { id: 'example', title: 'Example', content: <p>example</p> },
]
export default (
  <>
    <label>
      use arrow keys to navigate between items
      <br />
      <input placeholder="focus this, press tab" />
    </label>
    <Accordion items={items} />
  </>
)
