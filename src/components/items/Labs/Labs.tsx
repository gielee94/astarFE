import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/types';
import './Labs.css';
import loadingImage from './loading.gif';
import { useNavigate } from 'react-router-dom';

interface LabProp {
  labPlanId: {
    subscriptionId: string;
    parent: {
      resourceGroupName: string;
    };
    name: string;
  };
  provisioningState: number;
  state: number;
  title: string;
  virtualMachineProfile: {
    createOption: number;
    imageReference: {
      offer: string;
    };
    sku: {
      name: string;
    };
    usageQuota: string;
  };
  systemData: {
    createdOn: string;
  };
}

const Labs: React.FC = () => {
  const labs = useSelector((state: AppState) => state.labs.data);
  const sortedLabs = labs && [...labs].sort((a, b) => {
    const dateA = new Date(a.systemData.createdOn);
    const dateB = new Date(b.systemData.createdOn);
    return dateB.getTime() - dateA.getTime();
  });

  const [selectedLab, setSelectedLab] = useState<LabProp | null>(null);
  const navigate = useNavigate();

   

  return (
    <div className='labContainer'>
      {sortedLabs && sortedLabs.map((lab) => (
        <div
          key={lab.labPlanId.subscriptionId}
          className="labData-item"
          onClick={() => {
            if (
              !((lab.provisioningState === 0 && lab.state === 0) || (lab.provisioningState === 1 && lab.state === 1))
            ) {
              // Redirect to Azure Lab Services Portal
              window.location.href = `https://labs.azure.com/subscriptions/${lab.labPlanId.subscriptionId}/resourceGroups/${lab.labPlanId.parent.resourceGroupName}/providers/Microsoft.LabServices/labs/${lab.title}/dashboard`;
            } else {
              // Navigate to track.tsx
              navigate(`/track/${lab.labPlanId.subscriptionId}/${lab.labPlanId.parent.resourceGroupName}/${lab.title}`);
            }
          }}
        >
          <p>
            {lab.provisioningState === 0 && lab.state === 0
              ? (<div>"Creating" <img className = "loading-image" src = {loadingImage} /></div>)
              : lab.provisioningState === 1 && lab.state === 1
                ? (<div>"Publishing" <img className = "loading-image" src = {loadingImage} /></div>)
                : null
            }
          </p>
          <p>{lab.title}</p>
          <p>{lab.virtualMachineProfile.createOption === 1 ? 'Customizable' : 'Non-customizable'}</p>
          <p>{lab.virtualMachineProfile.imageReference.offer}</p>
          <p>rg: {lab.labPlanId.parent.resourceGroupName}</p>
          <p>subscription: {lab.labPlanId.subscriptionId}</p>
          <p>labplan: {lab.labPlanId.name}</p>
          <p>SKU Name: {lab.virtualMachineProfile.sku.name}</p>
          <p>Hours: {lab.virtualMachineProfile.usageQuota.substring(0, 2)}</p>
        </div>
      ))}
      
    </div>
  );
};

export default Labs;
