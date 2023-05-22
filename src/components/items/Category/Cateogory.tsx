import React, { useState } from "react";
import Popup from '../Popup/Popup';
import PopupTwo from "../Popup/PopupTwo";
import './Category.css';

const Category = () => {
    const data = [
        {
          category: "Popular",
          items: [
            {
              title: "Ubuntu Server 18.04 LTS",
              identifier: "Canonical.UbuntuServer.18.04-LTS",
              
            },
            {
              title: "CentOS-based 8.3 (Gen2)",
              identifier: "OpenLogic.CentOS.8_3-gen2",
              
            },
            {
                title: "Data Science Virtual Machine - Ubuntu 20.04",
                identifier: "microsoft-dsvm.ubuntu-2004.2004-gen2",
                
              },
          ],
        },
        {
          category: "Windows",
          items: [
            {
              title: "Windows Server 2016 Datacenter",
              identifier: "MicrosoftWindowsServer.WindowsServer.2016-Datacenter",
              
            },
            
          ],
        },
        {
          category: "Linux",
          items: [
            {
              title: "Ubuntu Server 18.04 LTS",
              identifier: "Canonical.UbuntuServer.18.04-LTS",
              
            },
            {
                title: "CentOS-based 8.3 (Gen2)",
                identifier: "OpenLogic.CentOS.8_3-gen2",
                Specification: "Classic_Fsv2_2_4GB_128_S_SSD"
            },
            {
                title: "Data Science Virtual Machine - Ubuntu 20.04",
                identifier: "microsoft-dsvm.ubuntu-2004.2004-gen2",
                
            },
            {
                title: "Data Science Virtual Machine - Ubuntu 20.04",
                identifier: "microsoft-dsvm.ubuntu-2004.2004-gen2",
                
            },
            {
                title: "CentOS-based 8.1 HPC",
                identifier: "OpenLogic.CentOS.8_1",
                
            },
          ],
        },
        {
          category: "Advanced Network Labs",
          items: [
            {
              title: "Windows 11 Pro, version 21H2 (Gen2)",
              identifier: "microsoftwindowsdesktop.windows-11.win11-21h2-pro",
              advanced: "yes",
              
            },
            
          ],
        },
      ];

  const [popupShow, setPopupShow] = useState(false);
  const [popupTwoShow, setPopupTwoShow] = useState(false);
  const [categorySelected, setCategorySelected] = useState<any | null>(null);





  const renderBox = (item: any) => (
    <div className="box" key={item.identifier} onClick={() => handleBoxClick(item)}>
      <h3>{item.title}</h3>
      <p style={{display: "none"}}>{item.identifier}</p>
      
    </div>
  );

  const handleBoxClick = (item: any) => {
    setCategorySelected(item);
    if(item.advanced === "yes") {
      setPopupTwoShow(true);
    } else {
      setPopupShow(true);
    }
  };

  const closePopup = () => {
    setPopupShow(false);
    setPopupTwoShow(false);
  };

  
  const renderPopup = () => (
    <div className="popup">
      <h3>{categorySelected?.title}</h3>
      <p>{categorySelected?.identifier}</p>
      <p>{categorySelected?.advanced}</p>
      <button onClick={closePopup}>Close</button>
    </div>
  );

  return (
    <div>
      {data.map((category) => (
        <div key={category.category} className="category-container">
          <h2 className="category-title">{category.category}</h2>
          <div className="box-container">.
            {category.items.map((item: any) => renderBox(item))}
          </div>
        </div>
      ))}
      
      {categorySelected?.advanced === 'yes' ? (
        <PopupTwo show={popupTwoShow} item={categorySelected} handleClose={closePopup} />
      ) : (
        <Popup show={popupShow} item={categorySelected} handleClose={closePopup} />
      )}
      
    </div>
  );
};

export default Category;