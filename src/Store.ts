import { applyMiddleware, createStore } from 'redux';
import { default as createSagaMiddleware } from 'redux-saga';
import { rootReducer } from './reducers/RootReducer';
import { rootSaga } from './sagas/RootSaga';
import { default as logger } from 'redux-logger';


const sagaMiddleware = createSagaMiddleware();
export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger)
);

sagaMiddleware.run(rootSaga);

