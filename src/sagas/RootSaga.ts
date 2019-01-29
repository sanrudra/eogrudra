import { all } from 'redux-saga/effects';
import { droneWatcherSaga } from './droneSaga';

export function* rootSaga() {
  yield all([
    droneWatcherSaga()
  ]);
}