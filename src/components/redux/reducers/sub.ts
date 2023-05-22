import { Reducer } from 'redux';
import { SubActionTypes, FETCH_SUB_SUCCESS, FETCH_SUB_FAILURE } from '../actions/sub';

export interface SubState {
  data: any[];
  error: Error | null;
}

const initialState: SubState = {
  data: [],
  error: null,
};

export const subReducer: Reducer<SubState, SubActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUB_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null,
      };
    case FETCH_SUB_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};


