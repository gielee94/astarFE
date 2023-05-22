import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { Action } from "redux";

export const FETCH_SUB_SUCCESS = "FETCH_SUB_SUCCESS";
export const FETCH_SUB_FAILURE = "FETCH_SUB_FAILURE";

interface FetchSubSuccessAction {
  type: typeof FETCH_SUB_SUCCESS;
  payload: any[];
}

interface FetchSubFailureAction {
  type: typeof FETCH_SUB_FAILURE;
  payload: Error;
}

export type SubActionTypes = FetchSubSuccessAction | FetchSubFailureAction;

export const fetchSub = (
  accessToken: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  const endpoint = "https://labsauto20230330224718.azurewebsites.net/api/sub";
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
      dispatch({ type: FETCH_SUB_SUCCESS, payload: data });
    } else {
      console.error("Error calling backend API:", await response.json());
    }
  } catch (error) {
    dispatch({ type: FETCH_SUB_FAILURE, payload: error });
    console.error("Error calling backend API:", error);
  }
};
