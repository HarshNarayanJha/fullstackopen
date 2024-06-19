/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
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
  const [weatherData, setWeatherData] = useState(null)

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
    setWeatherData(null)

    if (!e.target.value) { return }

    var singleMatch = false
    var singleMatchCountry = null

    var _matched = 0

    const tempCountries = countries.filter((country) => {
      if (_matched > 10) return false

      if (country.name.common.toLowerCase() === e.target.value.toLowerCase()) {
        singleMatch = true
        singleMatchCountry = country
      }

      if (country.name.common.toLowerCase().includes(e.target.value.toLowerCase())) {
        _matched++
        return true
      }
    })

    if (singleMatch) {
      setMatchCountry(singleMatchCountry)
      weatherService
        .getWeather(singleMatchCountry.capitalInfo.latlng[0], singleMatchCountry.capitalInfo.latlng[1])
        .then((weather) => {
          setWeatherData(weather)
        })
        .catch((error) => {
          setMessage(`Unable to fetch weather data!`)
        })

      return
    }

    if (tempCountries.length > 10) {
      setMessage(`Too many matches, try a finer keyword`)
    } else if (tempCountries.length > 1) {
      setMatchedCountries(tempCountries)
    } else if (tempCountries.length === 1) {
      setMatchCountry(tempCountries[0])
      weatherService
        .getWeather(tempCountries[0].capitalInfo.latlng[0], tempCountries[0].capitalInfo.latlng[1])
        .then((weather) => {
          setWeatherData(weather)
        })
        .catch((error) => {
          setMessage(`Unable to fetch weather data!`)
        })
    } else {
      setMessage("No matches")
    }
  }

  const toggleCountryData = (cioc) => {
    if (matchCountry == null) {
      const toggleCountry = matchedCountries.find(country => country.cioc === cioc)
      setMatchCountry(toggleCountry)
      weatherService
        .getWeather(toggleCountry.capitalInfo.latlng[0], toggleCountry.capitalInfo.latlng[1])
        .then((weather) => {
          setWeatherData(weather)
        })
        .catch((error) => {
          setMessage(`Unable to fetch weather data!`)
        })
    } else {
      setMatchCountry(null)
      setWeatherData(null)
    }
  }

  return (
    <div>
      <h2>Countries</h2>

      <Filter searchName={searchCountry} handleSearchName={handleSearchName} />

      <Notification message={message} messageType={'info'} />

      <Countries countries={matchedCountries} action={toggleCountryData} matchedCountry={matchCountry} />
      <CountryData country={matchCountry} weatherData={weatherData} />
    </div>
  )
}

export default App