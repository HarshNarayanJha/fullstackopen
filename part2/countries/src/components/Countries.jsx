const Countries = ({ countries, action, matchedCountry }) => {
    if (countries == null) {
        return
    }
    return countries.map(country =>
        <li key={country.cioc}>
            {country.name.common}&nbsp;&nbsp;
            <button key={country.cioc} onClick={() => action(country.cioc)}>{(matchedCountry && matchedCountry.cioc === country.cioc) ? "hide" : "show"}</button>
        </li>)
}

export default Countries