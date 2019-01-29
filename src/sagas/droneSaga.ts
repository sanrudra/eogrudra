import { call, put, takeLatest } from 'redux-saga/effects';
import { FETCH_drone_REQUEST, FETCH_drone_SUCCESS, FETCH_drone_FAILURE } from '../reducers/droneReducer';

export function* droneWatcherSaga() {
  yield takeLatest(FETCH_drone_REQUEST, droneWorkerSaga);
}

function* droneWorkerSaga() {
  console.log('Worker invoked');

  const response:any = yield call(fetchdrone);
  if (response != null) {
    //const drone = response.message;
    yield put({ type: FETCH_drone_SUCCESS, payload: { response : response.data } })
  }
}

function* fetchdrone() {
  try {
    console.log('Fetching drone');
    const response = yield fetch('https://react-assessment-api.herokuapp.com/api/drone');
    const responseJson = yield response.json()
    console.log('A', responseJson);
    return responseJson;
  } catch (error) {
    yield put({ type: FETCH_drone_FAILURE });
    return null;
  }
}