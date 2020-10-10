import React, { ChangeEvent, FC, useState } from 'react'

const SimpleInput: FC = () => {
  const [value, setValue] = useState('default value')
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
      <pre>{value}</pre>
      <button type="button" onClick={() => setValue('new value')}>
        change to `new value`
      </button>
    </div>
  )
}

export default <SimpleInput />
