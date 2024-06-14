const Persons = (props) => {
    return props.filteredPersons.map(person => <li key={person.name}>{person.name} {person.phone}</li>)
}

export default Persons