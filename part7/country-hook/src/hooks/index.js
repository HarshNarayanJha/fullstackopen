import axios from 'axios'
import { useEffect, useState } from 'react'

export const useCountry = name => {
  const URL = 'https://studies.cs.helsinki.fi/restcountries/api/name'

  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      return
    }

    axios
      .get(`${URL}/${name}`)
      .then(data => data.data)
      .then(data => {
        const countryData = {
          found: true,
          data: {
            name: data.name.common,
            capital: data.capital[0],
            population: data.population,
            flag: data.flags.png,
          },
        }
        setCountry(countryData)
        console.log(data)
      })
      .catch(error => {
        setCountry({
          found: false,
          data: null,
        })
        console.error(error)
      })
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [name])

  return country
}

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}
