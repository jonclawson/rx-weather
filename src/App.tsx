import * as React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import RxWeather  from './RxWeather';
import './style.css';
// import './bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import store from './store';

interface AppProps {}
interface AppState {
  name: string;
}

export default class App extends Component<AppProps, AppState> {
  constructor() {
    super({});
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