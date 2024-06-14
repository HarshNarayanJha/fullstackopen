import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])

  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const [searchName, setSearchName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const alreadyIn = persons.reduce((acc, person) => { return acc + (person.name === newName) ? 1 : 0 + (person.phone === newPhone) ? -1 : 0 }, 0);
    if (alreadyIn == 0) {
      setPersons(persons.concat({ name: newName, phone: newPhone }))
      setFilteredPersons(persons.concat({ name: newName, phone: newPhone }))
      setNewName('')
      setNewPhone('')
      setSearchName('')
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
    setFilteredPersons(persons.filter((person) => {
      if (e.target.value === '') {
        return true
      }
      
      return person.name.toLowerCase().includes(e.target.value)
    }))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={searchName} onChange={handleSearchName} required />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewName} type='name' required />
        </div>
        <div>
          phone: <input value={newPhone} onChange={handleNewPhone} required />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <li key={person.name}>{person.name} {person.phone}</li>)}
    </div>
  )
}

export default App