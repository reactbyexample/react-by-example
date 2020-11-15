import React, { ChangeEvent, FC, useState } from 'react'

export const SimpleInput: FC = () => {
  const [value, setValue] = useState('default value')
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <label>
        simple input
        <input type="text" value={value} onChange={onChange} />
      </label>
      <pre>{value}</pre>
      <button type="button" onClick={() => setValue('new value')}>
        change to `new value`
      </button>
    </div>
  )
}

export default <SimpleInput />
