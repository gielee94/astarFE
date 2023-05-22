import React from 'react';

interface DefaultRegionProps {
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
}

const regions = [
  { name: "East US", value: "eastus" },
  { name: "East US 2", value: "eastus2" },
  { name: "South Central US", value: "southcentralus" },
  { name: "West US", value: "westus" },
  { name: "West US 2", value: "westus2" },
  { name: "West US 3", value: "westus3" },
  { name: "Australia East", value: "australiaeast" },
  { name: "Southeast Asia", value: "southeastasia" },
  { name: "North Europe", value: "northeurope" },
  { name: "Sweden Central", value: "swedencentral" },
  { name: "UK South", value: "uksouth" },
  { name: "West Europe", value: "westeurope" },
  { name: "Central US", value: "centralus" },
  { name: "South Africa North", value: "southafricanorth" },
  { name: "Central India", value: "centralindia" },
  { name: "East Asia", value: "eastasia" },
  { name: "Japan East", value: "japaneast" },
  { name: "Korea Central", value: "koreacentral" },
  { name: "Canada Central", value: "canadacentral" },
  { name: "France Central", value: "francecentral" },
  { name: "Germany West Central", value: "germanywestcentral" },
  { name: "Norway East", value: "norwayeast" },
  { name: "Switzerland North", value: "switzerlandnorth" },
  { name: "UAE North", value: "uaenorth" },
  { name: "Brazil South", value: "brazilsouth" },
  { name: "Central US EUAP", value: "centraluseuap" },
  { name: "East US 2 EUAP", value: "eastus2euap" },
  { name: "Qatar Central", value: "qatarcentral" },
  { name: "Central US (Stage)", value: "centralusstage" },
  { name: "East US (Stage)", value: "eastusstage" },
  { name: "East US 2 (Stage)", value: "eastus2stage" },
  { name: "North Central US (Stage)", value: "northcentralusstage" },
  { name: "South Central US (Stage)", value: "southcentralusstage" },
  { name: "West US (Stage)", value: "westusstage" },
  { name: "West US 2 (Stage)", value: "westus2stage" },
  { name: "Asia", value: "asia" },
  { name: "Asia Pacific", value: "asiapacific" },
  { name: "Australia", value: "australia" },
  { name: "Brazil", value: "brazil" },
  { name: "Canada", value: "canada" },
  { name: "Europe", value: "europe" },
  { name: "France", value: "france" },
  { name: "Germany", value: "germany" },
  { name: "Global", value: "global" },
  { name: "India", value: "india" }
];

const DefaultRegion: React.FC<DefaultRegionProps> = ({ selectedRegion, setSelectedRegion }) => {
  return (
    <p>
      <label htmlFor="region">Region:</label>
      <select 
        id="region" 
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        <option value="">Select a region</option>
        {regions.map((region) => (
          <option key={region.value} value={region.value}>
            {region.name}
          </option>
        ))}
      </select>
    </p>
  );
};

export default DefaultRegion;
