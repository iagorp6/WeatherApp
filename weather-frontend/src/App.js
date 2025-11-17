import React, { useState, useEffect } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch city suggestions when city input changes
  useEffect(() => {
    if (city.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5`
        );
        const data = await response.json();
        if (data && data.results) {
          setSuggestions(data.results.map((item) => item.name));
        } else {
          setSuggestions([]);
        }
      } catch {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [city]);

  const fetchWeather = async () => {
    setError('');
    setWeather(null);

    const queryCity = selectedCity || city;
    if (!queryCity) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/weather?city=${queryCity}`);
      if (!response.ok) {
        setError('City not found or server error.');
        return;
      }
      const data = await response.json();
      setWeather(data);
    } catch {
      setError('Error fetching weather data.');
    }
  };

  const selectSuggestion = (suggestion) => {
    setCity(suggestion);
    setSelectedCity(suggestion);
    setSuggestions([]);
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fff',
        padding: 20,
        textAlign: 'center',
      }}
    >
      <h1 style={{ color: '#333', marginBottom: '1rem' }}>Weather App</h1>
      <div style={{ position: 'relative', width: '300px' }}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={e => {
            setCity(e.target.value);
            setSelectedCity(''); // clear selected city if user types
          }}
          style={{
            padding: '10px',
            width: '100%',
            marginBottom: '0.5rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '1rem',
            boxShadow: '0 0 5px rgba(0,0,0,0.1)',
          }}
        />
        {suggestions.length > 0 && (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              position: 'absolute',
              width: '100%',
              backgroundColor: 'white',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: '4px',
              maxHeight: '150px',
              overflowY: 'auto',
              zIndex: 10,
            }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #eee',
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'white')}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={fetchWeather}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          border: 'none',
          borderRadius: '6px',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1rem',
          fontWeight: 'bold',
          marginTop: '10px',
        }}
      >
        Get Weather
      </button>
      {error && <p style={{ color: '#e63946', marginTop: '10px' }}>{error}</p>}
      {weather && (
        <div
          style={{
            marginTop: '2rem',
            backgroundColor: '#74ebd5',
            padding: '15px',
            borderRadius: '10px',
            width: '320px',
            color: '#fff',
          }}
        >
          <h2>Weather for {selectedCity || city}</h2>
          <p>Temperature: {weather.current_weather.temperature} °C</p>
          <p>Windspeed: {weather.current_weather.windspeed} km/h</p>
          <p>Time: {weather.current_weather.time}</p>
        </div>
      )}
    </div>
  );
}

export default App;
