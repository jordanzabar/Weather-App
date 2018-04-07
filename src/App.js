// Created By Jordan Zabar
import React from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

//API KEY from openweathermap
const API_KEY = "9b86aca01248b2a8343c6dc613d4fb51";

class App extends React.Component 
{
  componentDidMount(){
    document.title = "Weather App"
  }
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if(city && country)
    {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    }
    //If the user doesn't enter a city or country it will call this error
    else{
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the values."
      });
    }

  }
  render()
  {
    return(
      <div>
        <div className="wrapper">
        <div className="main">
        <div className="container">
        <div className="row">
          <div className="col-xs-6 title-container">
            <Titles />
          </div>
          <div className="col-xs-6 form-container">
            <Form getWeather={this.getWeather}/>
              <Weather 
                temperature={this.state.temperature}
                city={this.state.city}
                country={this.state.country}
                humidity={this.state.humidity}
                description={this.state.description}
                error={this.state.error}/>
          </div>
        </div>
        </div>
        </div>
        </div>
      </div>
      
    );
  }
};
        

export default App;