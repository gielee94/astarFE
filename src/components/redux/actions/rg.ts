import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { Action } from "redux";

export const FETCH_RESOURCE_GROUPS_SUCCESS = "FETCH_RESOURCE_GROUPS_SUCCESS";
export const FETCH_RESOURCE_GROUPS_FAILURE = "FETCH_RESOURCE_GROUPS_FAILURE";

interface FetchResourceGroupsSuccessAction {
  type: typeof FETCH_RESOURCE_GROUPS_SUCCESS;
  payload: any[];
}

interface FetchResourceGroupsFailureAction {
  type: typeof FETCH_RESOURCE_GROUPS_FAILURE;
  payload: Error;
}

export type ResourceGroupsActionTypes = FetchResourceGroupsSuccessAction | FetchResourceGroupsFailureAction;

export const fetchResourceGroups = (
  accessToken: string
): ThunkAction<void, RootState, unknown, Action<string>> => async (dispatch) => {
  const endpoint = "https://labsauto20230330224718.azurewebsites.net/api/rg_a"; 
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
      dispatch({ type: FETCH_RESOURCE_GROUPS_SUCCESS, payload: data });
    } else {
      console.error("Error calling backend API:", await response.json());
    }
  } catch (error) {
    dispatch({ type: FETCH_RESOURCE_GROUPS_FAILURE, payload: error });
    console.error("Error calling backend API:", error);
  }
};
