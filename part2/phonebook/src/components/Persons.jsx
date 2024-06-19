const Persons = (props) => {
    return props.persons.map(person =>
        <li key={person.id}>
            {person.name} {person.number}&nbsp;&nbsp;&nbsp;
            <button onClick={() => props.action(person.id)}>{props.actionLabel}</button>
        </li>)
}

export default Persons