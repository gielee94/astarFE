import { FETCH_TOKEN, FetchTokenAction } from '../actions/token';

const initialState = {
  accessToken: null,
};

const tokenReducer = (state = initialState, action: FetchTokenAction) => {
  switch (action.type) {
    case FETCH_TOKEN:
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
};

export default tokenReducer;
