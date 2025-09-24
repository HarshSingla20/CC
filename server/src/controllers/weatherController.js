import axios from "axios";

const keralaCities = ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Kannur'];

export const getWeather = async (req, res) => {
  try {
    const weatherData = [];

    for (const city of keralaCities) {
      const geoResponse = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
        params: { name: city }
      });

      if (!geoResponse.data.results || geoResponse.data.results.length === 0) continue;

      const { latitude, longitude } = geoResponse.data.results[0];

      const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude,
          longitude,
          hourly: 'temperature_2m,precipitation',
          timezone: 'Asia/Kolkata'
        }
      });

      weatherData.push({
        city,
        latitude,
        longitude,
        weather: weatherResponse.data.hourly
      });
    }

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to fetch weather' });
  }
};
