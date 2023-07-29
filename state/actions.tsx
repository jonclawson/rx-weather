import { defineScenarioAction } from 'redux-typed-actions';
import { RxWeatherResponse } from './types';

export const RxWeatherLoad = defineScenarioAction<
  {
    query: string;
    page?: number;
  },
  RxWeatherResponse
>('Weather Load');
