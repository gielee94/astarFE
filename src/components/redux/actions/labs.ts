import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { Action } from "redux";

export const FETCH_LABS_SUCCESS = "FETCH_LABS_SUCCESS";
export const FETCH_LABS_FAILURE = "FETCH_LABS_FAILURE";

interface FetchLabsSuccessAction {
  type: typeof FETCH_LABS_SUCCESS;
  payload: any[];
}

interface FetchLabsFailureAction {
  type: typeof FETCH_LABS_FAILURE;
  payload: Error;
}

export type LabsActionTypes = FetchLabsSuccessAction | FetchLabsFailureAction;

export const fetchLabs = (
  accessToken: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  const endpoint = "https://labsauto20230330224718.azurewebsites.net/api/test";
  const headers = new Headers();
  headers.append("Authorization", "Bearer " + accessToken);

  const requestOptions = {
    method: "GET",
    headers: headers,
  };

  try {
    const response = await fetch(endpoint, requestOptions);
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: FETCH_LABS_SUCCESS, payload: data });
    } else {
      console.error("Error calling backend API:", await response.json());
    }
  } catch (error) {
    dispatch({ type: FETCH_LABS_FAILURE, payload: error });
    console.error("Error calling backend API:", error);
  }
};
