import React, { Component } from 'react';
import { Subject } from 'rxjs';
import { RxWeatherLoad } from './state/actions';
import { RootState, RxWeatherResponse, RxWeatherState } from './state/types';
import { connect } from 'react-redux';
import ReactMapboxGl, { GeoJSONLayer } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';

interface RxWeatherProps {
  name: string;
  weather: RxWeatherResponse;
  fetchWeather: typeof RxWeatherLoad.strictGet;
}
// mapboxgl.accessToken = 'xxxx';
// const Map = ReactMapboxGl({
//   accessToken: mapboxgl.accessToken,
// });

export class RxWeather extends Component<RxWeatherProps, RxWeatherState> {
  name: string;
  input$ = new Subject<string>();

  icon = (src) => <img id="wicon" src="{src}" alt="Weather icon" />;

  constructor(props) {
    super(props);
    this.name = props.name;

    this.input$
      .debounceTime(500)
      .filter((value) => value.length > 0)
      .subscribe((value) => this.props.fetchWeather({ query: value }));
  }

  handleQueryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.input$.next(e.target.value);
  };

  readTimeStamp(unix_timestamp: number) {
    var date = new Date(unix_timestamp * 1000);
    return date.toLocaleTimeString();
  }

  render() {
    console.log(JSON.stringify(this.props.weather, null, ' '));
    return (
      <div className="row">
        <div className="col">
          <div>
            <h1> {this.name}</h1>
            <input
              className="form-control"
              type="text"
              placeholder="Enter a City"
              defaultValue={this.props.weather?.name}
              onChange={this.handleQueryInput}
            />
          </div>
          {this.props.weather ? (
            <div className="mt-3">
              <div className="row">
                <div className="col-6">
                  {this.props.weather?.weather?.map((w) => (
                    <h1>
                      {w.description}{' '}
                      <img
                        className=""
                        src={`//openweathermap.org/img/wn/${w.icon}@2x.png`}
                      />
                      <span className="badge bg-warning">
                        {this.props.weather?.main?.temp.toFixed(0)}°F
                      </span>
                    </h1>
                  ))}
  
                </div>
                <div className="col-6">
                  <div>
                    feels like: {this.props.weather?.main?.feels_like}°F{' '}
                  </div>
                  <div>low: {this.props.weather?.main.temp_min} </div>
                  <div>high: {this.props.weather?.main.temp_max} </div>
                  <div>Humidity: {this.props.weather?.main.humidity} </div>
                  <div>Presure: {this.props.weather?.main.pressure} </div>
                  <div>Wind: {this.props.weather?.wind.speed} mph </div>
                </div>
              </div>

              <div>
                Sunrise: {this.readTimeStamp(this.props.weather?.sys.sunrise)} ,
                Sunset: {this.readTimeStamp(this.props.weather?.sys.sunset)} ,
              </div>

              {/* <Map
                style="mapbox://styles/mapbox/streets-v9" // eslint-disable-line
                containerStyle={{
                  height: '90vh',
                  width: '90vw',
                }}
                zoom={[16]}
                center={[
                  this.props.weather.coord.lon,
                  this.props.weather.coord.lat,
                ]}
              ></Map> */}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  weather: state.RxWeather.weather,
});

// No need for action creators anymore
export default connect(mapStateToProps, {
  fetchWeather: RxWeatherLoad.get,
})(RxWeather);
