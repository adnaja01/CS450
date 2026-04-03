import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const API_KEY = "";

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name.");
      setWeatherData(null);
      return;
    }

    const cityName = city.trim().toLowerCase();

    try {
      setError("");

      const savedData = await AsyncStorage.getItem(cityName);

      if (savedData) {
        setWeatherData(JSON.parse(savedData));
        return;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (response.status === 404) {
        setError("City not found.");
        setWeatherData(null);
        return;
      }

      const extractedData = {
        city: data.name,
        country: data.sys.country,
        station: data.weather[0].description,
        temperature: Math.round(data.main.temp),
        icon: `https://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      };

      await AsyncStorage.setItem(cityName, JSON.stringify(extractedData));
      setWeatherData(extractedData);
    } catch (err) {
      setError("Something went wrong.");
      setWeatherData(null);
      console.log(err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.appTitle}>Weather App</Text>

        <View style={styles.searchBox}>
          <Text style={styles.label}>
            Enter city name and press search button
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter city name..."
            placeholderTextColor="#8c8c8c"
            value={city}
            onChangeText={setCity}
          />

          <TouchableOpacity style={styles.button} onPress={getWeather}>
            <Text style={styles.buttonText}>SEARCH</Text>
          </TouchableOpacity>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {weatherData && (
          <View style={styles.card}>
            <Text style={styles.cityText}>
              {weatherData.city} {weatherData.country}
            </Text>

            <Text style={styles.stationText}>{weatherData.station}</Text>

            <Text style={styles.tempText}>{weatherData.temperature}°C</Text>

            <Image
              source={{ uri: weatherData.icon }}
              style={styles.weatherIcon}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7ead9",
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d95e3",
    marginBottom: 25,
  },
  searchBox: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f4f4f4",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 14,
    color: "#222",
  },
  button: {
    backgroundColor: "#2d95e3",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  errorText: {
    color: "#d62828",
    fontSize: 15,
    marginBottom: 18,
    fontWeight: "500",
  },
  card: {
    width: "88%",
    backgroundColor: "#ffffff",
    borderRadius: 18,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d9d9d9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cityText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
    marginBottom: 6,
  },
  stationText: {
    fontSize: 18,
    color: "#666",
    textTransform: "capitalize",
    marginBottom: 14,
    textAlign: "center",
  },
  tempText: {
    fontSize: 54,
    fontWeight: "300",
    color: "#111",
    marginBottom: 8,
  },
  weatherIcon: {
    width: 90,
    height: 90,
  },
});
