import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/types';

interface Lab {
    provisioningState: string;
    state: string;
    createOption: string;
    osType: string;


};
const useGetLab = (subscriptionId: string, resourceGroup: string, labTitle: string) => {
    const accessToken = useSelector((state: AppState) => state.token.accessToken);
  
    const [lab, setLab] = useState<Lab | null>(null);
    
    const params = {
      labName: labTitle,
      subscription: subscriptionId,
      rgName: resourceGroup,
    };
  
    
    const getLab = async () => {      
      try {
        if (accessToken) {
          const response = await axios.get("https://labsauto20230330224718.azurewebsites.net/api/getLab", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            params: params,
          }); 
          setLab(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };
  
   
  
    return { lab, getLab };
  };
  

export default useGetLab;
