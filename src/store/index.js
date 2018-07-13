import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import sagas from '../sagas';

import initialState from './initial-state';

export default (history) => {
  const sagaMiddleware = createSagaMiddleware();

  const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware,
    routerMiddleware(history),
  )(createStore);

  const rootReducer = combineReducers({
    ...reducers
  });

  const store = createStoreWithMiddleware(
    connectRouter(history)(rootReducer),
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  sagaMiddleware.run(sagas);

  return store;
}
