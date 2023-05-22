import React from 'react';

interface AllowedRegion {
  name: string;
  displayName: string;
}

interface RegionProps {
  allowedRegions: AllowedRegion[];
  handleRegionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Region: React.FC<RegionProps> = ({ allowedRegions, handleRegionChange }) => {
  return (
    <p>Region:
      {
        allowedRegions.length === 1 ? (
          <span>{allowedRegions[0].displayName}</span>
        ) : (
          <select onChange={handleRegionChange}>
            <option value="">Select a region</option>
            {allowedRegions.map((region, index) => (
              <option key={index} value={region.name}>
                {region.displayName}
              </option>
            ))}
          </select>
        )
      }
    </p>
  );
}

export default Region;
