/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from "./components/Notification"
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [searchName, setSearchName] = useState('')

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
      .catch(error => {
        setErrorMessage(`Error fetching information from the server`)

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const alreadyIn = persons.reduce((acc, p) => { return acc + ((p.name === newName) ? 1 : 0) + ((p.number === newNumber) ? -1 : 0) }, 0);
    if (alreadyIn == 0) {

      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setSuccessMessage(`Added ${newPerson.name}`)

          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)

        })
        .catch(_error => {
          setErrorMessage(`Error Creating ${newPerson.name}!`)

          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

    } else if (alreadyIn > 0) {
      if (confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {

        const person = persons.find(p => p.name === newName)
        const updatedPerson = { ...person, number: newNumber }
        personService
          .update(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')

            setSuccessMessage(`Updated ${updatedPerson.name}`)

            setTimeout(() => {
              setSuccessMessage(null)
            }, 5000)

          })
          .catch(_error => {
            setErrorMessage(`Information of ${person.name} has already been removed from the server!`)

            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    } else {
      setErrorMessage(`Number ${newNumber} is already added to phonebook!`)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deletePerson = (id) => {

    const person = persons.find(person => person.id === id)

    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(returnedData => {
          console.log(returnedData)
          setPersons(persons.filter(person => person.id !== returnedData.id))
        })
        .catch(_error => {
          setErrorMessage(`Information of ${person.name} has already been removed from the server!`)

          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })

      setSuccessMessage(`Deleted ${person.name}`)

      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleSearchName = (e) => {
    setSearchName(e.target.value)
  }

  const searchPersons =
    searchName === ''
      ? persons
      : persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} messageType={'error'} />
      <Notification message={successMessage} messageType={'success'} />

      <Filter searchName={searchName} handleSearchName={handleSearchName} />

      <h3>Add a new</h3>

      <PersonForm handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />

      <h3>Numbers</h3>

      <Persons persons={searchPersons} action={deletePerson} actionLabel={"delete"} />
    </div>
  )
}

export default App