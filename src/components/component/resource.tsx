import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/types';
import axios from 'axios';


interface ResourceProps {
  selectedRegion: string;
  selectedLP: any;
  osType: number;
  students: string;
}
interface Core {
  name: { value: string };
  currentValue: number;
  limit: number;
}


const Resource: React.FC<ResourceProps> = ({ selectedRegion, selectedLP, osType, students }) => {
    const accessToken = useSelector((state: AppState) => state.token.accessToken);
    const labplans = useSelector((state: AppState) => state.labPlans.data);
    const selectedLabPlan = labplans?.find((labplan) => labplan.id.name === selectedLP);
    const subscription = selectedLabPlan?.id.parent.parent.name;
    const [fsv2Data, setFsv2Data] = useState<{ currentValue: number, limit: number } | null>(null);


    useEffect(() => {
      if (selectedRegion && selectedLP) {
        const url = `https://management.azure.com/subscriptions/${subscription}/providers/Microsoft.LabServices/locations/${selectedRegion}/usages?api-version=2022-08-01`;
  
        const fetchData = async () => {
          try {
            const response = await axios.get(url, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            });
            const data: Core[] = response.data.value;
            const unit = data.find(item => item.name.value === "Fsv2");
            if (unit) {
              setFsv2Data({ currentValue: unit.currentValue, limit: unit.limit });
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        
        fetchData();
      }
    }, [selectedRegion, selectedLP, accessToken]);
    
    let studentCount = parseInt(students, 10);
    let expectedCores = studentCount * (osType === 0 ? 4 : 2);
    let availableCores = fsv2Data?.limit ? fsv2Data.limit - fsv2Data.currentValue : 0;

  return (
    <div>
    {fsv2Data && selectedRegion ? (
        <p>
            {fsv2Data.limit - fsv2Data.currentValue} of {fsv2Data.limit} Fsv2 vCPUs are available in {selectedRegion}. 
            You can create {Math.floor((fsv2Data.limit - fsv2Data.currentValue) / (osType === 0 ? 4 : 2))} VM(s).
            {availableCores < expectedCores && (
              <div><p> {expectedCores}vCPUs are required for {students} VM. </p>
              
            <p>Would you like to request a quota (core capacity) increase?</p>
            <a href="/">Please Click Here</a>
            </div>
            )}
            

        </p>
    ): null}
</div>
    );
}

export default Resource;
