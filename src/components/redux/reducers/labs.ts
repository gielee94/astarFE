import { FETCH_LABS_SUCCESS, FETCH_LABS_FAILURE, LabsActionTypes } from "../actions/labs";

export interface LabsState {
  data: any[] | null;
  error: Error | null;
}

const initialState: LabsState = {
  data: null,
  error: null,
};

export const labsReducer = (state = initialState, action: LabsActionTypes): LabsState => {
  switch (action.type) {
    case FETCH_LABS_SUCCESS:
      return { ...state, data: action.payload, error: null };
    case FETCH_LABS_FAILURE:
      return { ...state, data: null, error: action.payload };
    default:
      return state;
  }
};
