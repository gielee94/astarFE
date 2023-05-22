import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { Action } from "redux";

export const FETCH_LAB_PLANS_SUCCESS = "FETCH_LAB_PLANS_SUCCESS";
export const FETCH_LAB_PLANS_FAILURE = "FETCH_LAB_PLANS_FAILURE";

interface FetchLabPlansSuccessAction {
  type: typeof FETCH_LAB_PLANS_SUCCESS;
  payload: any[];
}

interface FetchLabPlansFailureAction {
  type: typeof FETCH_LAB_PLANS_FAILURE;
  payload: Error;
}

export type LabPlansActionTypes = FetchLabPlansSuccessAction | FetchLabPlansFailureAction;

export const fetchLabPlans = (
  accessToken: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  const endpoint = "https://labsauto20230330224718.azurewebsites.net/api/test2";
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
      dispatch({ type: FETCH_LAB_PLANS_SUCCESS, payload: data });
    } else {
      console.error("Error calling backend API:", await response.json());
    }
  } catch (error) {
    dispatch({ type: FETCH_LAB_PLANS_FAILURE, payload: error });
    console.error("Error calling backend API:", error);
  }
};
