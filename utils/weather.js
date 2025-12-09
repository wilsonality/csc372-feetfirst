const fetch = require('node-fetch');

async function getWeatherData(latitude, longitude) {
    const params = new URLSearchParams({
        latitude,
        longitude,
        daily: ["temperature_2m_min", "temperature_2m_max", "precipitation_hours"],
        timezone: "America/New_York",
        forecast_days: 3
    });

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    return await response.json();
}

module.exports = { getWeatherData };