import React from 'react';
import ReactDOM from 'react-dom';

import Titles from './Titles';
import Weather from './Weather';
import Form from './form';

const API_KEY = 'a7b206af4624fddd60d3e008b178801b';

class App extends React.Component {
    state = {
      temperature: undefined,
      country: undefined,
      city: undefined,
      humidity: undefined,
      description: undefined,
      error: undefined,
    }
     getWeather = async (e) => {
         e.preventDefault();
         const city = e.target.elements.name.city.value;
         const country = e.target.elements.name.country.value;

         const API_CALL = await fetch (`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
         const data = await API_CALL.json();
         if (city && country) {
         console.log(data);
         this.setState ({
           temperature: data.main.temp,
           country: data.sys.country,
           city: data.name,
           humidity: data.main.humidity,
           description: data.weather[0].description,
           error: '',
         });
     } else {
      this.setState ({
        temperature: undefined,
        country: undefined,
        city: undefined,
        humidity: undefined,
        description: undefined,
        error: 'Please enter a City & Country',
      });
     }
    }

  render() {
    return(
    <div>
      <Titles/>
      <Weather 
      temperature={this.state.temperature}
      country={this.state.country}
      city={this.state.city}
      humidity={this.state.city}
      description={this.state.description}
      error={this.state.error} />
      <Form getWeather={this.getWeather} />
      </div>
    );
  }
 
}


export default App;

ReactDOM.render(<app/>, document.getElementById('root'));