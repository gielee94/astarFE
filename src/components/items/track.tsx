import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import useGetLab from "../hook/getLab";
import { useSelector } from 'react-redux';
import { AppState } from '../redux/types';
import './track.css';


import axios from "axios";

const Track: React.FC = () => {
  const { subscriptionId, resourceGroup, labTitle } = useParams<{ subscriptionId?: string, resourceGroup?: string, labTitle?: string }>();
  const csvData = localStorage.getItem(`csvData_${labTitle}`);
  const { lab, getLab } = useGetLab(subscriptionId ?? '', resourceGroup?? '', labTitle?? '');
  const accessToken = useSelector((state: AppState) => state.token.accessToken);
  const [userList, setUserList] = useState([]);
  const [continueGetLab, setContinueGetLab] = useState(true);
  const [labdone, setLabdone] = useState(false);


  const [operationMessage, setOPmessage ] = useState('');
  useEffect(() => {
    getLab();
  }, []);

  if(lab == null){
    getLab();
  }

  let createOption: number = 0;
  let provisioningState: number = 0;
  let state: number = 0;
  let osType: number = 9;
  

  if(lab) {
    createOption = +lab.createOption;
    provisioningState = +lab.provisioningState;
    state = +lab.state;
    osType = +lab.osType;
  }

  let intervalId: NodeJS.Timeout | null = null;

  useEffect(() => {
  if (continueGetLab) {
    intervalId = setInterval(() => {
      getLab();
      console.log('fetched');
    }, 30000);
  }
  return () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
}, [continueGetLab, getLab]);





//auto publish if image
useEffect(() => {
  if (createOption === 0 && state === 0 && provisioningState === 3) {
    const data = { 
      labName: labTitle, 
      subscription: subscriptionId,
      rgName: resourceGroup,
    }
    try {
        axios.post("https://labsauto20230330224718.azurewebsites.net/api/publish", data, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        setOPmessage('publishstarted');
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
}, [createOption, state, provisioningState, labTitle, subscriptionId, resourceGroup, accessToken]);


useEffect(() => {
  if (state === 0 && provisioningState === 0) {
    if(csvData) {
      const data = { 
        labName: labTitle, 
        subscription: subscriptionId,
        rgName: resourceGroup,
        osType,
        csvData
      }

      axios.post("https://labsauto20230330224718.azurewebsites.net/api/user", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }).then(response => {
          setUserList(response.data);
          setOPmessage('User created!');
          setContinueGetLab(false);
      }).catch(error => {
          console.error("Error creating user:", error);
          setContinueGetLab(false);
      });
    } else {
      setContinueGetLab(false);
    }
  }
}, [state, provisioningState, osType, csvData, labTitle, subscriptionId, resourceGroup, accessToken, continueGetLab]);


useEffect(() => {
  if (userList && userList.length > 0) {
    const sendInvites = async () => {
      const requests = userList.map(user => {
        const url = `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/Microsoft.LabServices/labs/${labTitle}/users/${user}/invite?api-version=2022-08-01`;
        const data = {
          text: "Invitation to lab testlab"
        };
        return axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });
      });

      try {
        await Promise.all(requests);
        console.log("Invitations sent!!");
      } catch (error) {
        console.error("Error sending invite:", error);
      }
    };

    sendInvites();
    setLabdone(true);
    setContinueGetLab(false);
  }
}, [userList, accessToken, subscriptionId, resourceGroup, labTitle, continueGetLab]);

console.log(lab?.osType);

  
  return (
    <div className ="track-div">
    <div className="track-container">
      <div className="track-content">
    
      <p className="track-status">
      {provisioningState === 0 && state === 0 ? "Creating" :
      provisioningState === 3 && state === 0 ? "Created" :
      provisioningState === 1 && state === 1 ? "Publishing" :
      provisioningState === 3 && state === 4 ? "Published" : 
      "Unknown state"}
      </p>

      <div className="track-box">
        <p className="track-title">{labTitle}</p>
        
        <p>{osType === 1 ? "Linux Machine" :
          osType === 0 ? "Windows Machine" : null}</p>
        
        <p>Subscription ID: {subscriptionId}</p>
        <p>Resource Group: {resourceGroup}</p>
        <p>Student Email list: {csvData}</p>

        <p>We are going to automate Publish and Inviting User!</p>
        <p>Please Don't leave the page</p>
        <p>If you are using TemplateVm '(customzie)'</p>
        <p>Please click below link and pubish your VM</p>

      </div>

      <p>{operationMessage}</p>
    </div>
  </div>
  </div>
  )
  
};

export default Track;
