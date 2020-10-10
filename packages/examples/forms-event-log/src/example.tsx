import React, { FC, useState } from 'react'

export const EventLog: FC = () => {
  const [eventLog, setEventLog] = useState<string[]>([])
  const pushEvent = (event: string): void => {
    setEventLog([...eventLog, event])
  }
  return (
    <div>
      <input
        defaultValue="try copy/pasting"
        onFocus={() => pushEvent('onFocus')}
        onBlur={() => pushEvent('onBlur')}
        onCopy={() => pushEvent('onCopy')}
        onCut={() => pushEvent('onCut')}
        onPaste={() => pushEvent('onPaste')}
        onKeyDown={() => pushEvent('onKeyDown')}
        onKeyUp={() => pushEvent('onKeyUp')}
      />
      <ul>
        {eventLog.map((event) => (
          <li key={event}>{event}</li>
        ))}
      </ul>
    </div>
  )
}

export default <EventLog />
