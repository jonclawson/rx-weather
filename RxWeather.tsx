import React, { Component } from 'react';
import { Subject } from 'rxjs';
import { RxWeatherLoad } from './state/actions';
import { RootState, RxWeatherResponse, RxWeatherState } from './state/types';
import { connect } from 'react-redux';

interface RxWeatherProps {
  name: string;
  weather: RxWeatherResponse;
  fetchWeather: typeof RxWeatherLoad.strictGet;
}

export class RxWeather extends Component<RxWeatherProps, RxWeatherState> {
  name: string;
  input$ = new Subject<string>();

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
    return (
      <div className="row">
        <div className="col">
          <h1> {this.name}</h1>

          <input
            className="form-control"
            type="text"
            placeholder="Enter a City"
            defaultValue={this.props.weather?.name}
            onChange={this.handleQueryInput}
          />

          {this.props.weather ? (
            <div>
              <p>
                Currently:{' '}
                {this.props.weather?.weather?.map((w) => w.description)}
              </p>
              <p>
                <span className="badge bg-primary">
                  {' '}
                  {this.props.weather?.main?.temp}°F
                </span>
                , feels like: {this.props.weather?.main?.feels_like}°F, low:{' '}
                {this.props.weather?.main.temp_min}, high:{' '}
                {this.props.weather?.main.temp_max}, Humidity:{' '}
                {this.props.weather?.main.humidity}, Presure:{' '}
                {this.props.weather?.main.pressure}, Wind:{' '}
                {this.props.weather?.wind.speed} mph, Sunrise:{' '}
                {this.readTimeStamp(this.props.weather?.sys.sunrise)} , Sunset:{' '}
                {this.readTimeStamp(this.props.weather?.sys.sunset)} ,
              </p>
            </div>
          ) : (
            ''
          )}

          {/* <pre>{JSON.stringify(this.props?.weather, 1, ' ')}</pre> */}
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
