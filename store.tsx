import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { RootState } from './state/types';
import { rootReducer } from './state/reducers';
import { rootEpic } from './state/epics';

const composeEnhancers = (
  window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares: any[] = [
    createEpicMiddleware(rootEpic),
  ];
  // // compose enhancers
  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
  );
  // create store
  return createStore(
    rootReducer,
    initialState!,
    enhancer,
  );
}

// pass an optional param to rehydrate state on app start
const store = configureStore();

// export store singleton instance
export default store;
