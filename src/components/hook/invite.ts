import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/types';

const useInviteUser = (subscriptionId: string, resourceGroup: string, labTitle: string, usernumber: string) => {
    const accessToken = useSelector((state: AppState) => state.token.accessToken);
  
    const params = {
      labName: labTitle,
      subscription: subscriptionId,
      rgName: resourceGroup,
      usernumber
    };
  
    useEffect(() => {
      const inviteUser = async () => {
        try {
          await axios.post("https://labsauto20230330224718.azurewebsites.net/api/invite", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            params: params,
          }); 
          console.log("Lab automation complete!");
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      inviteUser();
    }, [accessToken, params]);
};

export default useInviteUser;
