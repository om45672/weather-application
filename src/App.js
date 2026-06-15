// import { useState } from "react";
// import Search from "./components/search/search";
// import CurrentWeather from "./components/current-weather/current-weather";
// import Forecast from "./components/forecast/forecast";
// import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
// import "./App.css";

// function App() {
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);

//   const handleOnSearchChange = (searchData) => {
//     const [lat, lon] = searchData.value.split(" ");

//     const currentWeatherFetch = fetch(
//       `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
//     );
//     const forecastFetch = fetch(
//       `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
//     );

//     Promise.all([currentWeatherFetch, forecastFetch])
//       .then(async (response) => {
//         const weatherResponse = await response[0].json();
//         const forcastResponse = await response[1].json();

//         setCurrentWeather({ city: searchData.label, ...weatherResponse });
//         setForecast({ city: searchData.label, ...forcastResponse });
//       })
//       .catch(console.log);
//   };

//   return (
//     <div className="container">
//       {/* Welcome Header */}
//       <header className="app-header">
//         <h1>Hey! This is Jenil,</h1>
//         <p>Welcome to my weather app! 🌤️ Check the current weather and forecast for your favorite cities.</p>
//       </header>

//       {/* Search Component */}
//       <Search onSearchChange={handleOnSearchChange} />

//       {/* Weather and Forecast */}
//       {currentWeather && <CurrentWeather data={currentWeather} />}
//       {forecast && <Forecast data={forecast} />}
//     </div>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [weatherRecords, setWeatherRecords] = useState([]); // For Read
  const [formData, setFormData] = useState({
    location: "",
    dateRange: "",
    temperature: "",
  }); // For Create/Update

  const API_URL = "http://localhost:5001/api/weather"; // Backend API URL

  // Fetch all weather records (Read)
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setWeatherRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create a new weather record
  const handleCreate = async () => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchRecords(); // Refresh records
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };

  // Update an existing weather record
  const handleUpdate = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchRecords(); // Refresh records
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  // Delete a weather record
  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      fetchRecords(); // Refresh records
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Handle Search Change
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch(console.log);
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1>Hey! This is Om,</h1>
        <p>Welcome to my weather app! 🌤️ Check the current weather and forecast for your favorite cities.</p>
      </header>

      {/* Search Component */}
      <Search onSearchChange={handleOnSearchChange} />

      {/* Weather and Forecast */}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}

      {/* CRUD Section */}
      <div className="crud-section">
        <h2>Manage Weather Records</h2>

        {/* Form for Create/Update */}
        <form>
          <input
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
          />
          <input
            name="dateRange"
            placeholder="Date Range"
            value={formData.dateRange}
            onChange={handleInputChange}
          />
          <input
            name="temperature"
            placeholder="Temperature"
            value={formData.temperature}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleCreate}>
            Create
          </button>
        </form>

        {/* List of Weather Records */}
        <ul>
          {weatherRecords.map((record) => (
            <li key={record._id}>
              {record.location} | {record.dateRange} | {record.temperature}
              <button onClick={() => handleUpdate(record._id)}>Update</button>
              <button onClick={() => handleDelete(record._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

