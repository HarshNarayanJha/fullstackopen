import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '+919876543210' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (persons.reduce((acc, person) => { return acc + (person.name === newName || person.phone === newPhone) ? 1 : 0 }, 0) == 0) {
      setPersons(persons.concat({ name: newName, phone: newPhone }))
      setNewName('')
      setNewPhone('')
    } else {
      alert(`${newName} or ${newPhone} is already added to phonebook`)
    }
  }

  const handleNewName = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNewPhone = (e) => {
    console.log(e.target.value)
    setNewPhone(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map(person => <li key={person.name}>{person.name} {person.phone}</li>)}
    </div>
  )
}

export default App