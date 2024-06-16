const Persons = (props) => {
    return props.persons.map(person => <li key={person.name}>{person.name} {person.phone}</li>)
}

export default Persons