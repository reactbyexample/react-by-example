import React, { FC, useEffect, useState } from 'react'

export const LocaleClock: FC<{ locale?: string }> = ({ locale }) => {
  // note how different hooks can be used together
  const [timeString, setTimeString] = useState<string>()
  useEffect(() => {
    const update = () => {
      setTimeString(new Date().toLocaleTimeString(locale))
    }
    update()

    const interval = window.setInterval(update, 500)

    return () => {
      window.clearInterval(interval)
    }
  }, [locale])

  return <p>{timeString}</p>
}

export const ToggleLocale: FC = () => {
  const [locale, setLocale] = useState('en-GB')
  const toggleLocale = () => {
    setLocale(locale === 'en-GB' ? 'th-TH-u-nu-thai' : 'en-GB')
  }

  return (
    <>
      <button type="button" onClick={toggleLocale}>
        toggle locale
      </button>
      <LocaleClock locale={locale} />
    </>
  )
}

export default <ToggleLocale />
