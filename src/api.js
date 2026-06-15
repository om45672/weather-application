// export const geoApiOptions = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "",// enter your rapid api key here
//     "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
//   },
// };
// export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
// export const WEATHER_API_KEY = ""; // enter your key from openweather API

// GeoDB Cities API Configuration

// GeoDB Cities API Configuration
export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY, // Use environment variable for the RapidAPI key
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};

export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

// OpenWeather API Configuration
export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Use environment variable for the OpenWeather key

// Function to Fetch City Data from GeoDB
export const fetchCityData = async (cityName) => {
  const url = `${GEO_API_URL}/cities?namePrefix=${cityName}`;
  console.log("Fetching data for:", cityName); // Log the city name being searched
  try {
    const response = await fetch(url, geoApiOptions);
    console.log("Response status:", response.status); // Log the response status
    if (!response.ok) {
      console.error(`Error fetching city data: ${response.status}`);
      return null;
    }
    const data = await response.json();
    console.log("City data:", data); // Log the response data
    return data;
  } catch (error) {
    console.error("Error fetching city data:", error);
    return null;
  }
};

// Function to Fetch Weather Data from OpenWeather
export const fetchWeatherData = async (city) => {
  const url = `${WEATHER_API_URL}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Error fetching weather data: ${response.status}`);
      return null;
    }
    const data = await response.json();
    return data; // Returns JSON response with weather details
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
