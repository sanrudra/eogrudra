import { combineReducers } from 'redux';

import { droneReducer } from './droneReducer';

const allReducers = {
  droneReducer
};

export const rootReducer = combineReducers(allReducers);

