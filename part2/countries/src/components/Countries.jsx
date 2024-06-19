const Countries = (props) => {
    if (props.countries == null) {
        return
    }
    return props.countries.map(country =>
        <li key={country.ccn3}>
            {country.name.common}
            {/* <button onClick={() => props.action(person.id)}>{props.actionLabel}</button> */}
        </li>)
}

export default Countries