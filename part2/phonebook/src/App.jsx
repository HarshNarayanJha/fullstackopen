import { useEffect, useState } from 'react'
import axios from 'axios'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const alreadyIn = persons.reduce((acc, person) => { return acc + (person.name === newName) ? 1 : 0 + (person.phone === newPhone) ? -1 : 0 }, 0);
    if (alreadyIn == 0) {
      setPersons(persons.concat({ name: newName, phone: newPhone }))
      setNewName('')
      setNewPhone('')
    } else {
      alert(`${alreadyIn > 0 ? newName : newPhone} is already added to phonebook`)
    }
  }

  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewPhone = (e) => {
    setNewPhone(e.target.value)
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

      <PersonForm handleSubmit={handleSubmit} newName={newName} newPhone={newPhone} handleNewName={handleNewName} handleNewPhone={handleNewPhone} />

      <h3>Numbers</h3>

      <Persons persons={searchPersons} />
    </div>
  )
}

export default App