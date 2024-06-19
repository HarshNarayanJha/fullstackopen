/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import countryService from './services/countries'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Notification from './components/Notification'
import './index.css'
import CountryData from './components/CountryData'

const App = () => {
  const [countries, setCountries] = useState([])
  const [matchedCountries, setMatchedCountries] = useState(null)
  const [searchCountry, setSearchCountry] = useState('')
  const [matchCountry, setMatchCountry] = useState(null)

  const [message, setMessage] = useState(null)

  useEffect(() => {
    countryService
      .getAll()
      .then((allCountries) => {
        setCountries(allCountries)
      })
      .catch(error => {
        setMessage(`Error fetching information from the server`)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }, [])

  const handleSearchName = (e) => {
    setSearchCountry(e.target.value)
    setMessage(null)
    setMatchedCountries(null)
    setMatchCountry(null)

    if (!e.target.value) { return }

    var singleMatch = false
    var singleMatchCountry = null

    const tempCountries = countries.filter((country) => {
      if (country.name.common.toLowerCase() === e.target.value.toLowerCase()) {
        singleMatch = true
        singleMatchCountry = country
      }

      return country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    })

    if (singleMatch) {
      setMatchCountry(singleMatchCountry)
      return
    }

    if (tempCountries.length > 10) {
      setMessage(`Too many matches, try a finer keyword`)
    } else if (tempCountries.length > 1) {
      setMatchedCountries(tempCountries)
    } else if (tempCountries.length === 1) {
      setMatchCountry(tempCountries[0])
    } else {
      setMessage("No matches")
    }
  }

  const toggleCountryData = (cioc) => {
    if (matchCountry == null) {
      const toggleCountry = matchedCountries.find(country => country.cioc === cioc)
      setMatchCountry(toggleCountry)
    } else {
      setMatchCountry(null)
    }
  }

  return (
    <div>
      <h2>Countries</h2>

      <Filter searchName={searchCountry} handleSearchName={handleSearchName} />

      <Notification message={message} messageType={'info'}/>

      <Countries countries={matchedCountries} action={toggleCountryData} matchedCountry={matchCountry}/>
      <CountryData country={matchCountry} />
    </div>
  )
}

export default App