import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type GalleryProps = {
  imageName : string;
  galleryName : string;
  galleryRegion : string;
  galleryRG : string;
  osType : string;
  submitClicked: boolean;
  accessToken: string | null;
  selectedACG: any;
  labTitle: string | null;
  login: string;
  password: string;
  students: string | null;
  custom: boolean;
  csvData: string | null;
  selectedLabPlan: any | null;
};

const useGallery = ({
  submitClicked,
  csvData,
  accessToken,
  selectedACG,
  labTitle,
  login,
  osType,
  password,
  students,
  custom,
  galleryName,
  galleryRG,
  galleryRegion,
  imageName,
  selectedLabPlan,
}: GalleryProps) => {
  
  useEffect(() => {
    if (!submitClicked) {
      return;
    }

    const fetchData = async () => {
      const data = {
        labTitle,
        csvData,
        login,
        password,
        students,
        custom,
        galleryName,
        galleryRG,
        galleryRegion,
        imageName,
        osType,
        size: osType === '0' ? 'Classic_Fsv2_4_8GB_128_S_SSD' : 'Classic_Fsv2_2_4GB_128_S_SSD',
        hours: osType === '0' ? '15:00:00' : '10:00:00',
        lpName: selectedLabPlan?.id.name,
        rgName: selectedLabPlan?.id.parent.name,
        subscription: selectedLabPlan?.id.parent.parent.name,
      };

      try {
        await axios.post("https://labsauto20230330224718.azurewebsites.net/api/acglab", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });        
        //navigate(`/track/${data.subscription}/${data.rgName}/${data.labTitle}`);
      } catch (error) {
        console.error("Error calling test4 function:", error);
      }
      
    };

    fetchData();
  }, [submitClicked, accessToken, selectedACG, selectedLabPlan, labTitle, login, password, students, custom, galleryName, galleryRG, galleryRegion, imageName, csvData]);
};

export default useGallery;
