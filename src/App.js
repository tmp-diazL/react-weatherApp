import React, { Component } from "react";
import dotenv from "dotenv";

import Spinner from "./components/Spinner";
import Forecast from "./components/Forecast";

dotenv.config();

const style = {
  positin: "relative",
  width: "80%",
  margin: "0 auto",
  padding: "2rem"
};

const errStyle = {
  display: "none",
  width: "calc(400px - 2rem)",
  height: "2rem",
  fontSize: "2rem",
  fontFamily: "sans-serif",
  fontWeight: "400",
  marginLeft: "2rem",
  background: "#fc3f3f",
  color: "#fff",
  padding: "1rem",
  borderRadius: "2px",
  textAlign: "center"
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
    this.setBackground = this.setBackground.bind(this);
    this.fetchCity = this.fetchCity.bind(this);
  }

  setWeatherData(data) {
    this.setState({ results: data });
  }

  setBackground(imgPath) {
    const bg = document.getElementById("weather_app");

    bg.style.background = `url(${imgPath})`;
    bg.style.backgroundRepeat = "no-repeat";
    bg.style.backgroundSize = "cover";
  }

  fetchCity(city) {
    const url = `${BASE_URL}weather?q=${city}&units=imperial&appid=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (!data.main) {
          const el = document.querySelector(".search_err");
          el.style.display = "block";
          setTimeout(() => {
            el.style.display = "none";
          }, 1500);

          return;
        } else {
          this.setWeatherData(data);
        }
      });
  }

  componentDidMount() {
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

    // if (results && results.cod !== undefined && results.cod === "404") {
    //   return <div>not found</div>;
    // }

    return (
      <div id="weather_app" style={style}>
        <h1
          style={{
            fontFamily: "sans-serif",
            fontWeight: 400,
            textTransform: "capitalize",
            color: "#fdfdfd"
          }}
        >
          Weather App
        </h1>
        <div className="search_err" style={errStyle}>
          <span>Not Found</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: "400px",
            padding: "2rem"
          }}
        >
          {(results && (
            <Forecast
              info={results}
              search={this.fetchCity}
              bg={this.setBackground}
            />
          )) || <Spinner />}
        </div>
      </div>
    );
  }
}

export default App;
