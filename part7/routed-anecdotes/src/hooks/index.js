import { useState } from 'react'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  const reset = _ => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
  }
}
