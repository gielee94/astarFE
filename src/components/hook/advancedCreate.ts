import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/types';

type UseACreateProps = {
  submitClicked: boolean;
  accessToken: string | null;
  apiData: any;
  selectedLP: string | null;
  labTitle: string | null;
  login: string;
  password: string;
  students: string | null;
  imageName: string;
  item: any;
  
};

const useACreate = ({
  submitClicked,
  accessToken,
  apiData,
  selectedLP,
  labTitle,
  login,
  password,
  students,
  imageName,
  item,  
}: UseACreateProps) => {
  const navigate = useNavigate();
  const labplans = useSelector((state: AppState) => state.labPlans.data);
  useEffect(() => {
    if (!submitClicked) {
      return;
    }

    const fetchData = async () => {
      const selectedLabPlan = labplans?.find((labplan) => labplan.id.name === selectedLP);
      const data = {
        selectedLP,
        labTitle,
        login,
        password,
        students,
        author: apiData?.data.author,
        offer: apiData?.data.offer,
        publisher: apiData?.data.publisher,
        sku: apiData?.data.sku,
        version: apiData?.data.version,
        ostype: apiData?.data.osType,
        size: apiData?.data.osType === 0 ? 'Classic_Fsv2_4_8GB_128_S_SSD' : 'Classic_Fsv2_2_4GB_128_S_SSD',
        hours: apiData?.data.osType === 0 ? '15:00:00' : '10:00:00',
        lpName: selectedLabPlan?.id.name,
        rgName: selectedLabPlan?.id.parent.name,
        subscription: selectedLabPlan?.id.parent.parent.name,
        imageName: item?.identifier,
        region: selectedLabPlan?.data.location.name,
        vnet: selectedLabPlan?.data.defaultNetworkSubnetId.parent.name,
        subnet: selectedLabPlan?.data.defaultNetworkSubnetId.name,
      };

      try {
        await axios.post("https://labsauto20230330224718.azurewebsites.net/api/alab", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });        
        
        

      } catch (error) {
        console.error("Error calling test4 function:", error);
      }
      
    };

    fetchData();
  }, [submitClicked, accessToken, apiData, labplans, selectedLP, labTitle, login, password, students]);
};

export default useACreate;
