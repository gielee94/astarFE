import {
    FETCH_RESOURCE_GROUPS_SUCCESS,
    FETCH_RESOURCE_GROUPS_FAILURE,
    ResourceGroupsActionTypes,
  } from "../actions/rg";
  
  export interface ResourceGroupsState {
    data: any[] | null;
    error: Error | null;
  }
  
  const initialState: ResourceGroupsState = {
    data: null,
    error: null,
  };
  
  export const resourceGroupsReducer = (
    state = initialState,
    action: ResourceGroupsActionTypes
  ): ResourceGroupsState => {
    switch (action.type) {
      case FETCH_RESOURCE_GROUPS_SUCCESS:
        return { ...state, data: action.payload, error: null };
      case FETCH_RESOURCE_GROUPS_FAILURE:
        return { ...state, data: null, error: action.payload };
      default:
        return state;
    }
  };
  