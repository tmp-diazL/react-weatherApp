import React from "react";
import "./Forecast.css";

const BASE_URL = "https://api.unsplash.com/search/photos/?page=1&query=";
const API_KEY = `${process.env.REACT_APP_UKEY}`;

class Forecast extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null
    };

    this.setResults = this.setResults.bind(this);
  }

  setResults(data) {
    this.setState({ results: data });
    console.log(data);
  }

  componentDidMount() {
    const url = `${BASE_URL}${this.props.info.weather[0].description}`;

    fetch(url, {
      headers: {
        Authorization: `Client-ID ${API_KEY}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const fch = document.querySelector(".fc-header");
        fch.style.background = `url(${
          data.results[Math.ceil(Math.random() * data.results.length - 1)].urls
            .small
        })`;
      });
  }

  render() {
    const { info } = this.props;
    let sunrise = new Date(info.sys.sunrise * 1000);
    let sunset = new Date(info.sys.sunset * 1000);
    let today = new Date(Date.now());

    return (
      <div className="forecast">
        <div className="fc-header">
          <div className="fc-headinfo">
            <div>
              <h3>
                {info.name}, {info.sys.country}
              </h3>
              <span>{today.toDateString()}</span>
              <span>{info.weather[0].description}</span>
            </div>
            <div>
              <span className="fc-temp">{Math.floor(info.main.temp)}&deg;</span>
            </div>
          </div>

          <div>
            <img
              src={`http://openweathermap.org/img/w/${
                info.weather[0].icon
              }.png`}
              alt="forecast"
            />
          </div>
        </div>

        <div className="fc-footer">
          <div>
            <h5>winds</h5>
            <small>{info.wind.speed} mph</small>
          </div>
          <div>
            <h5>humidity</h5>
            <small>{info.main.humidity}%</small>
          </div>
          <div>
            <h5>sunrise</h5>
            <small>
              {sunrise.getHours()}:{sunrise.getMinutes()}
            </small>
          </div>
          <div>
            <h5>sunset</h5>
            <small>
              {sunset.getHours()}:{sunset.getMinutes()}
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default Forecast;
