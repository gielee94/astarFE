import {
  FETCH_LAB_PLANS_SUCCESS,
  FETCH_LAB_PLANS_FAILURE,
  LabPlansActionTypes,
} from "../actions/lp";

export interface LabPlansState {
  data: any[] | null;
  error: Error | null;
  sharedGalleries: SharedGalleryIdInfo[] | null;
}

export interface SharedGalleryIdInfo {
  sharedGalleryId: string;
  resourceGroupName: string;
  labPlan: string;
  sharedGallerySubscription: string;
}

const initialState: LabPlansState = {
  data: null,
  error: null,
  sharedGalleries: null,
};

function extractSharedGalleryIds(labPlans: any[]): SharedGalleryIdInfo[] {
  const sharedGalleryIds: SharedGalleryIdInfo[] = [];

  labPlans.forEach((labplan) => {
    if (labplan && labplan.data && labplan.data.sharedGalleryId) {
      const { sharedGalleryId } = labplan.data;
      const { parent, name } = sharedGalleryId;

      const existingSharedGalleryId = sharedGalleryIds.find((item) => item.sharedGalleryId === name);

      if (!existingSharedGalleryId) {
        sharedGalleryIds.push({
          sharedGalleryId: name,
          resourceGroupName: parent.name,
          labPlan: labplan.name,
          sharedGallerySubscription: parent.parent.name,
        });
      }
    }
  });

  return sharedGalleryIds;
}

export const labPlansReducer = (
  state = initialState,
  action: LabPlansActionTypes
): LabPlansState => {
  switch (action.type) {
    case FETCH_LAB_PLANS_SUCCESS:
      const sharedGalleries = extractSharedGalleryIds(action.payload);
      return { ...state, data: action.payload, error: null, sharedGalleries };
    case FETCH_LAB_PLANS_FAILURE:
      return { ...state, data: null, error: action.payload };
    default:
      return state;
  }
};

