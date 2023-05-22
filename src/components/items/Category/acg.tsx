import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/types";
import axios from "axios";
import './Category.css';
import Popup from "../Popup/Popup";
import PopupThree from "../Popup/PopupThree"

const ACG: React.FC = () => {
  const accessToken = useSelector((state: AppState) => state.token.accessToken);
  const rgs = useSelector((state: AppState) => state.rgs.data);
  let rg_list: string[] | undefined;
  if (rgs) {
    rg_list = rgs.map(rg => rg?.data?.id?.name);
  }

  const [apiData, setApiData] = useState<any[]>([]);
  const [selectedACG, setACGSelected] = useState<any | null>(null);

  const [popupThreeShow, setThreePopupShow] = useState(false);

  const handleBoxClick = (data: any) => {
    setACGSelected(data);
    setThreePopupShow(true);
  };

  const handleClose = (data: any) => {
    setACGSelected(null);
    setThreePopupShow(false);
  };
  const closePopup = () => {
    setThreePopupShow(false);
    
  };

  
  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await axios.get(
          "https://labsauto20230330224718.azurewebsites.net/api/gallery",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            }
          }
        );
  
        setApiData(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching gallery image data:", error);
      }
    };
    
    fetchApiData();
  }, [accessToken]);

  return (
    <div className="category-container">

    {apiData.length > 0 && <h2 className="category-title">ACG Gallery</h2>}
      <div className="box-container">
        {apiData.map((data, index) => {
          const imageName = data.id?.name ?? "";
          const acgName = data.id?.parent?.name ?? "";
          const rgName = data.id?.parent?.parent?.name ?? "";
          const correctRgName = rg_list?.find(rg => rg?.toLowerCase() === rgName.toLowerCase());
          const subscription = data.id?.parent?.parent?.parent?.name ?? "";
          const sharedGalleryId = `/subscriptions/${subscription}/resourceGroups/${rgName}/providers/Microsoft.Compute/galleries/${acgName}/images/${imageName}`;

          return (
            <div key={index} className="box" onClick={() => handleBoxClick(data)}>
              <h2>{imageName}</h2>
              
              <h2>OS Type: {data.osType === 0 ? "Windows" : "Linux"}</h2>
              <p>ACG Name: {acgName}</p>
              <p>RG Name: {correctRgName} </p>
              <p>Sub: {subscription}</p>
              <p className="hide">SharedGalleryId: {sharedGalleryId}</p>
            </div>
          );
        })}
      </div>
      <PopupThree show = {popupThreeShow} selectedACG={selectedACG} handleClose={closePopup}/>
    </div>
  );
};

export default ACG;