import { useState } from 'react'

export const useField = (type, name, ref) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }
  /* tjoo liian hankala ratkaisu
    useImperativeHandle(ref, () => {
      return {
        reset
      }
    })
  */
  return {
    input: {
      type,
      name,
      value,
      onChange,
    },
    reset
  }
}

