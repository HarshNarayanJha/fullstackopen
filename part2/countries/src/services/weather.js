import axios from "axios";

const baseUrl = 'https://api.open-meteo.com/v1/forecast'

const getWeather = (lat, long) => {
    const request = axios.get(`${baseUrl}?latitude=${lat}&longitude=${long}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m`)
    return request.then(response => response.data)
}

export default { getWeather }