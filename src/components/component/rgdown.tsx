import React, { useState, useEffect } from 'react';

interface ResourceGroupDropdownProps {
  rgs: any[];
  selectedRG: string;
  setSelectedRG: (value: string) => void;
  inputRG: string;
  setInputRG: (value: string) => void;
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
}

const ResourceGroupDropdown: React.FC<ResourceGroupDropdownProps> = ({ 
  rgs, 
    selectedRG, 
    setSelectedRG,
    inputRG,
    setInputRG,
    selectedRegion,
    setSelectedRegion}) => {
  const [showRG, setShowRG] = useState(false);
  useEffect(() => {
    if (selectedRG) {
      const selectedResourceGroup = rgs.find(rg => rg.data.id.name === selectedRG);
      if (selectedResourceGroup && selectedResourceGroup.data.location) {
        setSelectedRegion(selectedResourceGroup.data.location.name);
      }
    }
  }, [selectedRG, rgs, setSelectedRegion]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRG(event.target.value);
  };

  const handleNewSubmit = () => {
    setSelectedRG(inputRG);
    setInputRG(inputRG);
    setShowRG(false);
  };

  return (
    <div>
      <label htmlFor="resourceGroup">Resource Group:</label>
      <select
        id="resourceGroup"
        className="resource-group-dropdown"
        value={selectedRG}
        onChange={handleChange}
      >
        {selectedRG 
          ? <option value={selectedRG}>{selectedRG}</option>
          : <option value="">Select a resource group</option>
        }
        {rgs.map((rg) => (
          <option key={rg.id} value={rg.name}>
            {rg.id.name}
          </option>
        ))}
      </select>
      <button onClick={() => setShowRG(true)}>New</button>
      {showRG && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px'
          }}>
            <label htmlFor="resourceGroupName">Resource Group Name:</label>
            <input 
              id="resourceGroupName" 
              value={inputRG} 
              onChange={(e) => setInputRG(e.target.value)} 
            />
            <button 
              onClick={handleNewSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResourceGroupDropdown;
