import { defineScenarioAction } from 'redux-typed-actions';
import { RxWeatherResponse } from './types';

export const RxWeatherLoad = defineScenarioAction<
  {
    query: string;
    coords?: { latitude: number; longitude: number };
  },
  RxWeatherResponse
>('Weather Load');
