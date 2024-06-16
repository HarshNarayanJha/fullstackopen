const Persons = (props) => {
    console.log(props);
    return props.persons.map(person => {
        return (
            <div key={person.id}>
                <li style={{ 'display': "inline" }}>{person.name} {person.number}</li>
                &nbsp;&nbsp;&nbsp;
                <button onClick={() => props.action(person.id)}>{props.actionLabel}</button>
                <br /><br />
            </div>
        )
    })
}

export default Persons