import { LabsState } from "./reducers/labs";
import { LabPlansState } from "./reducers/lp";
import { ResourceGroupsState } from "./reducers/rg";
import { SubState } from "./reducers/sub";
// redux/types.ts
export interface AppState {
    labs: LabsState;
    labPlans: LabPlansState;
    token: {
      accessToken: string | null;
    },
    rgs: ResourceGroupsState;
    sub: SubState;
    
};

export interface SharedGalleryIdInfo {
    sharedGalleryId: string;
    resourceGroupName: string;
    labPlan: string;
    sharedGallerySubscription: string;
    sub: string;
  }
  