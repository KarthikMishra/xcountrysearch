/** @format */
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries");
      setCountries(response.data);
    } catch (error) {
      console.error("something is wrong", error);
    }
  };

  const filteredCountries = countries.filter((country) =>
    country.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for countries..."
        value={search}
        className="searchInput"
        onChange={(e) => setSearch(e.target.value)}
      ></input>

      <div className="countryGrid">
        {filteredCountries.map((country) => {
          return (
            <div className="countryCard">
              <img
                src={country.png}
                alt={country.common}
                className="flag"
              />
              <p className="countryName">{country.common}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
