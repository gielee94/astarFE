import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/types';

const useCreateUser = (subscriptionId: string, resourceGroup: string, labTitle: string, csvData: string) => {
    const accessToken = useSelector((state: AppState) => state.token.accessToken);
  
    const [usernumber, setUsernumber ] = useState('');
    const [loading, setLoading] = useState(false);
    const params = {
      labName: labTitle,
      subscription: subscriptionId,
      rgName: resourceGroup,
      csvData
    };
  
    const createUser = async () => {
      setLoading(true);
      try {
        const response = await axios.post("https://labsauto20230330224718.azurewebsites.net/api/user", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          params: params,
        }); 
        setUsernumber(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    return { usernumber, createUser };
};

export default useCreateUser;
