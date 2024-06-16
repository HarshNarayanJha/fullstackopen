import { useEffect, useState } from 'react'
import personService from './services/persons'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const alreadyIn = persons.reduce((acc, person) => { return acc + (person.name === newName) ? 1 : 0 + (person.number === newNumber) ? -1 : 0 }, 0);

    if (alreadyIn == 0) {

      const newPerson = { name: newName, number: newNumber }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })

    } else {

      alert(`${alreadyIn > 0 ? newName : newNumber} is already added to phonebook`)
    }
  }

  const deletePerson = (id) => {

    const person = persons.find(person => person.id === id)

    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then(returnedData => {
          setPersons(persons.filter(person => person.id !== returnedData.id))
        })
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

      <Filter searchName={searchName} handleSearchName={handleSearchName} />

      <h3>Add a new</h3>

      <PersonForm handleSubmit={handleSubmit} newName={newName} newNumber={newNumber} handleNewName={handleNewName} handleNewNumber={handleNewNumber} />

      <h3>Numbers</h3>

      <Persons persons={searchPersons} action={deletePerson} actionLabel={"delete"} />
    </div>
  )
}

export default App