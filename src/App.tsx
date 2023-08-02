import * as React from 'react';
import { Component } from 'react';
import RxWeather  from './RxWeather';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';


interface AppProps {}
interface AppState {
  name: string;
}

export default class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'RxWeather',
    };
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg bg-warning ">
          <div className="container-fluid ">
            <span className="display-5 ">RxWeather</span>
          </div>
        </nav>
        <RxWeather />
      </div>
    );
  }
}