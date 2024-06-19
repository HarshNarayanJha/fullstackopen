const CountryData = ({ country }) => {
    if (country == null) {
        return
    }

    const languages = Object.keys(country.languages).map((lang) => <li key={lang}>{country.languages[lang]}</li>)

    return <>
        <h1>{country.name.common}</h1>

        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>

        <h2>languages:</h2>

        <ul>
            {languages}
        </ul>

        <img src={country.flags.png} />
    </>
}

export default CountryData