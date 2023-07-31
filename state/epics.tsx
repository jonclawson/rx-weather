import { Observable } from 'rxjs/Observable';
import { AjaxError } from 'rxjs/observable/dom/AjaxObservable';
import { Epic, combineEpics } from 'redux-observable';
import { PlainAction } from 'redux-typed-actions';
import { RxWeatherLoad } from './actions';
import { RootState } from './types';
import { RxWeatherResponse } from './types';

function getQueryUrl(query: string, lat: number, lon: number): string {
  const key = '57226df170b92a945f80de10392146b1';
  const units = 'imperial';
  const url = `//api.openweathermap.org/data/2.5/weather?APPID=${key}&units=${units}`;

  if (query) {
    return `${url}&q=${encodeURIComponent(query)}`;
  }

  if (lat && lon) {
    return `${url}&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(
      lon
    )}`;
  }
}

const rxWeather: Epic<PlainAction, RootState> = (action$, state) =>
  action$.filter(RxWeatherLoad.is).switchMap((action) => {
    const { query, coords } = action.payload;
    return Observable.ajax({
      url: getQueryUrl(query, coords.latitude, coords.longitude),
      async: true,
      method: 'get',
      crossDomain: true,
    })
      .map((res) => res.response as RxWeatherResponse)
      .map((res) => RxWeatherLoad.success.get(res))
      .catch((err: AjaxError) =>
        Observable.of(RxWeatherLoad.failure.get(err.stack || err.message))
      );
  });

export const rootEpic = combineEpics(combineEpics(rxWeather));
