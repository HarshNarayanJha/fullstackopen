import wmo_codes from '../data/wmo_codes'

const WeatherData = ({ countryName, weatherData }) => {

    if (weatherData == null) { return }

    const arrows = ["⬇", "⬉", "⬅", "⬋", "⬆", "⬈", "➡", "⬊"];

    const windAngleToArrow = angle => arrows[Math.round((angle % 360) / 45) % 8];

    return <div>
        <h2>Weather in {countryName}</h2>
        <p>temperature: {weatherData.current.temperature_2m} {weatherData.current_units.temperature_2m}</p>

        <p>{wmo_codes[weatherData.current.weather_code].day.description}</p>
        <img src={wmo_codes[weatherData.current.weather_code].day.image} />

        <p>
            wind {weatherData.current.wind_speed_10m} {weatherData.current_units.wind_speed_10m}
            &nbsp;
            {windAngleToArrow(weatherData.current.wind_direction_10m)} ({weatherData.current.wind_direction_10m}{weatherData.current_units.wind_direction_10m})
        </p>
    </div>
}

export default WeatherData