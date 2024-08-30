import { useEffect, useState } from "react";

function App() {
  const pakistanCities = [
    { name: "Karachi", latitude: 24.8607, longitude: 67.0011 },
    { name: "Lahore", latitude: 31.5497, longitude: 74.3436 },
    { name: "Islamabad", latitude: 33.6844, longitude: 73.0479 },
    { name: "Rawalpindi", latitude: 33.5651, longitude: 73.0169 },
    { name: "Peshawar", latitude: 34.0151, longitude: 71.5249 },
    { name: "Quetta", latitude: 30.1798, longitude: 66.975 },
    { name: "Faisalabad", latitude: 31.4504, longitude: 73.135 },
    { name: "Multan", latitude: 30.1575, longitude: 71.5249 },
    { name: "Sialkot", latitude: 32.4927, longitude: 74.5313 },
    { name: "Hyderabad", latitude: 25.396, longitude: 68.3578 },
    { name: "Gujranwala", latitude: 32.1877, longitude: 74.1945 },
    { name: "Sargodha", latitude: 32.0836, longitude: 72.6711 },
    { name: "Bahawalpur", latitude: 29.3956, longitude: 71.6833 },
    { name: "Sukkur", latitude: 27.7052, longitude: 68.8574 },
    { name: "Mardan", latitude: 34.1979, longitude: 72.0454 },
    { name: "Mingora", latitude: 34.7717, longitude: 72.361 },
    { name: "Larkana", latitude: 27.557, longitude: 68.212 },
    { name: "Nawabshah", latitude: 26.2483, longitude: 68.4096 },
    { name: "Sheikhupura", latitude: 31.7131, longitude: 73.9783 },
    { name: "Jhang", latitude: 31.2681, longitude: 72.3194 },
  ];

  const [chosen, setChosen] = useState(pakistanCities[0]); // Default to Karachi
  const [weatherData, setWeatherData] = useState(null);
  const [scale, setScale] = useState("Celsius");
  const [scaleValue, setScaleValue] = useState(null);

  useEffect(() => {
    if (chosen) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${chosen.latitude}&lon=${chosen.longitude}&appid=c153479685c47f1b34a83591f3b1acbe`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData(data);
          // Set the initial temperature value in Celsius
          const initialTemp = Math.floor(data.main.temp - 273.15);
          setScaleValue(initialTemp);
        })
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  }, [chosen]);

  const scalehandel = (e) => {
    const newScale = e.target.value;
    setScale(newScale);

    if (weatherData && weatherData.main) {
      const temperatureInCelsius = Math.floor(weatherData.main.temp - 273.15);
      const temperatureInFahrenheit = Math.floor(
        temperatureInCelsius * 1.8 + 32
      );

      if (newScale === "Celsius") {
        setScaleValue(temperatureInCelsius);
      } else if (newScale === "Fahrenheit") {
        setScaleValue(temperatureInFahrenheit);
      }
    }
  };

  function getWeatherIcon(weatherCondition) {
    switch (weatherCondition.toLowerCase()) {
      case "clear":
        return "sun";
      case "clouds":
        return "cloud";
      case "rain":
        return "cloud-showers-heavy";
      case "drizzle":
        return "cloud-rain";
      case "thunderstorm":
        return "bolt";
      case "snow":
        return "snowflake";
      case "mist":
      case "smoke":
      case "haze":
      case "fog":
      case "sand":
      case "dust":
      case "ash":
      case "squall":
      case "tornado":
        return "smog";
      default:
        return "cloud"; // Fallback icon
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="container py-10">
        <div className="flex justify-center items-center">
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden w-full max-w-md">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6">
              <h3 className="text-center text-white font-extrabold text-3xl">
                Weather Forecast
              </h3>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <select
                  className="w-full bg-gray-100 border border-gray-300 text-gray-800 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 transition duration-300 ease-in-out"
                  aria-label="Select City"
                  name="pakistanCities"
                  onChange={(e) =>
                    setChosen(pakistanCities[e.target.selectedIndex - 1])
                  }
                >
                  <option value="" disabled selected>
                    Select a City
                  </option>
                  {pakistanCities.map((city, index) => (
                    <option key={index} value={index}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <form className="mb-6 text-center" onChange={scalehandel}>
                <div className="inline-flex items-center">
                  <input
                    className="form-check-input rounded-full text-blue-600 focus:ring-blue-500 transition duration-300 ease-in-out"
                    type="radio"
                    name="temperatureOptions"
                    id="celsiusRadio"
                    value="Celsius"
                    defaultChecked
                  />
                  <label
                    className="ml-2 text-gray-800 font-medium transition duration-300 ease-in-out"
                    htmlFor="celsiusRadio"
                  >
                    Celsius
                  </label>
                </div>
                <div className="inline-flex items-center ml-6">
                  <input
                    className="form-check-input rounded-full text-blue-600 focus:ring-blue-500 transition duration-300 ease-in-out"
                    type="radio"
                    name="temperatureOptions"
                    id="fahrenheitRadio"
                    value="Fahrenheit"
                  />
                  <label
                    className="ml-2 text-gray-800 font-medium transition duration-300 ease-in-out"
                    htmlFor="fahrenheitRadio"
                  >
                    Fahrenheit
                  </label>
                </div>
              </form>
              <div className="bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg shadow-inner p-6 transition-all duration-300 ease-in-out">
                {weatherData && weatherData.main ? (
                  <>
                    <h4 className="text-2xl text-center text-gray-800 font-bold mb-4">
                      {chosen.name}
                    </h4>
                    <p className="text-lg text-gray-700 mb-2 text-center">
                      Current Temperature:{" "}
                      <strong>
                        {scaleValue}°{scale === "Celsius" ? "C" : "F"}
                      </strong>
                    </p>
                    <p className="text-lg text-gray-700 text-center">
                      Feels Like:{" "}
                      <strong>
                        {Math.floor(weatherData.main.feels_like - 273.15)}°C
                      </strong>
                    </p>
                    <p className="text-lg text-gray-700 text-center">
                      Max:{" "}
                      <strong>
                        {Math.floor(weatherData.main.temp_max - 273.15)}°C
                      </strong>
                      , Min:{" "}
                      <strong>
                        {Math.floor(weatherData.main.temp_min - 273.15)}°C
                      </strong>
                    </p>
                    <div className="flex justify-center items-center mt-4">
                      <p className="text-lg text-gray-700 mr-4 capitalize">
                        {weatherData.weather[0].description}
                      </p>
                      <i
                        className={`fas fa-${getWeatherIcon(
                          weatherData.weather[0].main
                        )} fa-3x text-gray-400 transition duration-300 ease-in-out`}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-lg text-gray-700 text-center">
                    Loading weather data...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
