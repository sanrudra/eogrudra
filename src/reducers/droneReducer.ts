export const FETCH_drone_REQUEST = 'FETCH_drone_REQUEST';
export const FETCH_drone_SUCCESS = 'FETCH_drone_SUCCESS';
export const FETCH_drone_FAILURE = 'FETCH_drone_FAILURE';

const initialState = {
  drone: null
};

export const droneReducer = (state = initialState, action: any) => {
  switch (action.type) {

    case FETCH_drone_REQUEST:
      return {
        ...state
      }

    case FETCH_drone_FAILURE:
      return {
        ...state
      }

    case FETCH_drone_SUCCESS:
      return {
        ...state,
        drone: action.payload
      }
    default:
      return initialState;
  }
}