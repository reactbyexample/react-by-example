import React, { ChangeEvent, FC, useCallback } from 'react'

export interface SliderProps {
  value: number
  onChange: (n: number) => void
}

export const Slider: FC<SliderProps> = ({ value, onChange }) => {
  const onRangeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      onChange(Number(event.target.value))
    },
    [onChange],
  )

  return (
    <label>
      <input
        type="range"
        value={value}
        onChange={onRangeChange}
        min={50}
        max={150}
        step={25}
      />
      {value}
    </label>
  )
}
