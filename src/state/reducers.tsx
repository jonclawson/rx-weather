import { combineReducers } from 'redux';
import { RootState } from './types';
import { PlainAction } from 'redux-typed-actions';
import { RxWeatherState } from './types';
import { RxWeatherLoad } from './actions';


export const InitialState: RxWeatherState = {
  weather: undefined,
  error: false,
  message: '',
  loading: false,
};

function rxWeatherReducer(state: RxWeatherState = InitialState, action: PlainAction): RxWeatherState {
  if (RxWeatherLoad.is(action)) {
    return {
      ...state,
      message: '',
      error: false,
      loading: true,
    };

  } else if (RxWeatherLoad.success.is(action)) {
    return {
      ...state,
      message: 'success',
      loading: false,
      weather: action.payload,
    };
  
  } else if (RxWeatherLoad.failure.is(action)) {
    return {
      ...state,
      error: true,
      loading: false,
      message: action.payload,
    };

  } else {
    return state;
  }
}

export const rootReducer = combineReducers<RootState>({
  RxWeather: rxWeatherReducer,
});
