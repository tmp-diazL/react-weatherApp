import React, { Component } from "react";
import dotenv from "dotenv";

import Searchbar from "./components/Searchbar";
import Forecast from "./components/Forecast";

dotenv.config();

const style = {
  positin: "relative",
  width: "80%",
  margin: "0 auto",
  background: "red"
};
const API_KEY = `${process.env.REACT_APP_WKEY}`;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null
    };

    this.setWeatherData = this.setWeatherData.bind(this);
  }

  setWeatherData(data) {
    this.setState({ results: data });
    console.log(data);
  }

  componentDidMount() {
    //const url = `${BASE_URL}weather?q=manhattan&units=imperial&appid=${API_KEY}`

    window.navigator.geolocation.getCurrentPosition(position => {
      const url = `${BASE_URL}weather?lat=${position.coords.latitude}&
										lon=${position.coords.longitude}&units=imperial&appid=${API_KEY}`;

      fetch(url)
        .then(response => response.json())
        .then(data => this.setWeatherData(data));
    });
  }

  render() {
    const { results } = this.state;

    return (
      <div style={style}>
        <h1 style={{ fontFamily: "sans-serif", fontWeight: 400 }}>
          Weather App
        </h1>
        {(results && <Forecast info={results} />) || "nothing to see"}

        <Searchbar />
      </div>
    );
  }
}

export default App;
