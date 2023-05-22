// LabPlanDropdown.tsx
import React from 'react';

interface LabPlan {
  id: {
    name: string;
  };
  data: {
    defaultNetworkSubnetId: {
      name: string;
    };
  };
}

interface LabPlanDropdownProps {
  labplans?: LabPlan[];
  selectedLP?: string;
  handleLPChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LabPlanDropdown: React.FC<LabPlanDropdownProps> = ({ labplans, selectedLP, handleLPChange }) => {
    if (!labplans) {
        return null; // or some fallback UI
      }
  return (
    <div>
      <p>Lab Plan
        <select onChange={handleLPChange} value={selectedLP}>
            <option value="">Select a lab plan</option>
            {labplans?.map((labplan) => (
            <option key={labplan.id.name} value={labplan.id.name}>
                {labplan.id.name}
            </option>
            ))}
        </select>
      </p>
    </div>
  );
}

export default LabPlanDropdown;
