// import React, { useState } from "react";
// import { AsyncPaginate } from "react-select-async-paginate";
// import { geoApiOptions, GEO_API_URL } from "../../api";

// const Search = ({ onSearchChange }) => {
//   const [search, setSearch] = useState(null);

//   const loadOptions = (inputValue) => {
//     return fetch(
//       `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
//       geoApiOptions
//     )
//       .then((response) => response.json())
//       .then((response) => {
//         return {
//           options: response.data.map((city) => {
//             return {
//               value: `${city.latitude} ${city.longitude}`,
//               label: `${city.name}, ${city.countryCode}`,
//             };
//           }),
//         };
//       });
//   };

//   const handleOnChange = (searchData) => {
//     setSearch(searchData);
//     onSearchChange(searchData);
//   };

//   return (
//     <AsyncPaginate
//       placeholder="Search for city"
//       debounceTimeout={600}
//       value={search}
//       onChange={handleOnChange}
//       loadOptions={loadOptions}
//     />
//   );
// };

// export default Search;
import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false); // Track loading state

  const loadOptions = async (inputValue) => {
    console.log("User input value:", inputValue); // Log user input

    // Prevent empty input from making API calls
    if (!inputValue.trim()) {
      console.log("Input is empty, returning no options.");
      return { options: [] };
    }

    setLoading(true); // Indicate that the data is being fetched

    try {
      const response = await fetch(
        `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
        geoApiOptions
      );

      console.log("API Request URL:", `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`);
      console.log("Response Status:", response.status); // Log HTTP status

      if (!response.ok) {
        console.error(`Error fetching city data: HTTP ${response.status}`);
        setLoading(false); // Reset loading state
        return { options: [{ value: null, label: "Error fetching data" }] }; // Fallback for errors
      }

      const data = await response.json();
      console.log("API Response Data:", data); // Log the data received from the API

      setLoading(false); // Reset loading state after fetching

      return {
        options: data.data.length
          ? data.data.map((city) => ({
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            }))
          : [{ value: null, label: "No cities found" }], // Fallback if no cities match
      };
    } catch (error) {
      console.error("Error in API fetch:", error); // Log any fetch-related errors
      setLoading(false); // Reset loading state
      return { options: [{ value: null, label: "Error fetching data" }] }; // Fallback for fetch errors
    }
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData); // Set the selected city
    onSearchChange(searchData); // Notify parent component
  };

  return (
    <AsyncPaginate
      placeholder={loading ? "Loading..." : "Search for city"} // Show loading state
      debounceTimeout={800} // Prevent rapid requests
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions} // Load city options dynamically
    />
  );
};

export default Search;