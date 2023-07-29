import React, { Component } from 'react';
import { render } from 'react-dom';
import RxWeather from './RxWeather';
import './style.css';
import './bootstrap.css';
import { Provider } from 'react-redux';
import store from './store';

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor() {
    super();
    this.state = {
      name: 'RxWeather',
    };
  }

  render() {
    return (
      <div className="container">
        <RxWeather name={this.state.name} />
      </div>
    );
  }
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
