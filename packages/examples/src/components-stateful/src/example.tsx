import React, { FC, useState } from 'react'

export const Pizza: FC = () => {
  const [topping, setTopping] = useState('none')
  return (
    <div>
      <p>Choose a pizza topping:</p>
      <div>
        <button type="button" onClick={() => setTopping('tomato sauce')}>
          tomato sauce
        </button>
        <button type="button" onClick={() => setTopping('bbq sauce')}>
          bbq sauce
        </button>
        <button type="button" onClick={() => setTopping('garlic sauce')}>
          garlic sauce
        </button>
      </div>
      <p>Chosen topping: {topping}</p>
    </div>
  )
}

export default <Pizza />
