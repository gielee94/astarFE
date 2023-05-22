import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Page.css';
import { useIsAuthenticated } from '@azure/msal-react';
import { SigninButton } from './Navbar/SignIn';

import Labs from './Labs/Labs';
import ACG from './Category/acg';
import Category from './Category/Cateogory';
import Footer from './Footer/Footer';

import { AppState } from '../redux/types';
import { useSelector } from 'react-redux';

export const regions = [
  { name: "East US", value: "eastus" },
{ name: "East US 2", value: "eastus2" },
{ name: "South Central US", value: "southcentralus" },
{ name: "West US 2", value: "westus2" },
{ name: "West US 3", value: "westus3" },
{ name: "Australia East", value: "australiaeast" },
{ name: "Southeast Asia", value: "southeastasia" },
{ name: "North Europe", value: "northeurope" },
{ name: "Sweden Central", value: "swedencentral" },
{ name: "UK South", value: "uksouth" },
{ name: "West Europe", value: "westeurope" },
{ name: "Central US", value: "centralus" },
{ name: "South Africa North", value: "southafricanorth" },
{ name: "Central India", value: "centralindia" },
{ name: "East Asia", value: "eastasia" },
{ name: "Japan East", value: "japaneast" },
{ name: "Korea Central", value: "koreacentral" },
{ name: "Canada Central", value: "canadacentral" },
{ name: "France Central", value: "francecentral" },
{ name: "Germany West Central", value: "germanywestcentral" },
{ name: "Norway East", value: "norwayeast" },
{ name: "Switzerland North", value: "switzerlandnorth" },
{ name: "UAE North", value: "uaenorth" },
{ name: "Brazil South", value: "brazilsouth" },
{ name: "Central US EUAP", value: "centraluseuap" },
{ name: "East US 2 EUAP", value: "eastus2euap" },
{ name: "Qatar Central", value: "qatarcentral" },
{ name: "Central US (Stage)", value: "centralusstage" },
{ name: "East US (Stage)", value: "eastusstage" },
{ name: "East US 2 (Stage)", value: "eastus2stage" },
{ name: "North Central US (Stage)", value: "northcentralusstage" },
{ name: "South Central US (Stage)", value: "southcentralusstage" },
{ name: "West US (Stage)", value: "westusstage" },
{ name: "West US 2 (Stage)", value: "westus2stage" },
{ name: "Asia", value: "asia" },
{ name: "Asia Pacific", value: "asiapacific" },
{ name: "Australia", value: "australia" },
{ name: "Brazil", value: "brazil" },
{ name: "Canada", value: "canada" },
{ name: "Europe", value: "europe" },
{ name: "France", value: "france" },
{ name: "Germany", value: "germany" },
{ name: "Global", value: "global" },
{ name: "India", value: "india" }
];


const Page: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [hasLabPlan, setHasLabPlan] = useState(false);
  const labplans = useSelector((state: AppState) => state.labPlans.data);
  const subscription = useSelector((state: AppState) => state.sub.data);
  const rgs = useSelector((state: AppState) => state.rgs.data);
  const [selectedRG, setSelectedRG] = useState('');
  const [labPlanTitle, setLabPlanTitle] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const accessToken = useSelector((state: AppState) => state.token.accessToken);
  const [inputRG, setInputRG] = useState("");

  const [showRG, setshowRG] = useState(false);
  

  

  

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

 

  
  
  const handleSubmit = async () => {
    const data = {
      selectedRegion,
      labPlanTitle,
      selectedRG,
      inputRG
    };
    try {
      await axios.post("https://labsauto20230330224718.azurewebsites.net/api/firstResource", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        }, 
      });
      

      } catch (error) {
      console.log('Error sending data', error);
      }

  };

  useEffect(() => {
    // This will run after component mounts
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (subscription !== null && subscription.length > 0){
        setHasSubscription(true);
      } else {
        setHasSubscription(false);
      }
      if (labplans !== null && labplans.length > 0) {
        setHasLabPlan(true);
      } else {
        setHasLabPlan(false);
      }
    }, 3000); // 6000 milliseconds = 6 seconds

    // This will run when the component unmounts
    return () => {
      clearTimeout(timer);
    };
  }, [labplans, subscription]);

  const renderContent = () => {
    if (!isAuthenticated) {
      return (
        <div>
          <h1>Welcome to Azure Lab Services</h1>
          <p>
            Azure Lab Services enable you to easily set up a class, run a training
            lab, host a hackathon, experiment, and test your proof-of-concept ideas
            in the cloud.
          </p>
          <p>
            Already a user? <SigninButton />
          </p>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div>
          <h1>Please Wait System processing</h1>
        </div>
      )
    }

    if (!hasSubscription) {
      return <div>In order to use Azure Lab Service,
        You need subscrtipion.
        <a>https://azure.microsoft.com/en-us/free/</a>
      </div>;
    }

    if (!hasLabPlan) {
      return (
        <div className="app-container">
            <div className="no-lab-plan-container">
              {rgs ? (
                <>
                  <h2>Looks like you don't have a lab plan</h2>
                  <p>Please select:</p>
                  <div className="form-container">
                    <div className="form-group">
                      <label htmlFor="labPlanTitle">Lab Plan Title:</label>
                        <input
                          type="text"
                          id="labPlanTitle"
                          className="lab-plan-title-input"
                          value={labPlanTitle}
                          onChange={(e) => setLabPlanTitle(e.target.value)}
                        />
                      <label htmlFor="resourceGroup">Resource Group:</label>
                      <select
                        id="resourceGroup"
                        className="resource-group-dropdown"
                        value={selectedRG}
                        onChange={(e) => setSelectedRG(e.target.value)}
                      >
                        {selectedRG 
                          ? <option value={selectedRG}>{selectedRG}</option>
                          : <option value="">Select a resource group</option>
                        }
                        {rgs.map((rg) => (
                          <option key={rg.id} value={rg.name}>
                            {rg.id.name}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => setshowRG(true)}>New</button>
                      {showRG && (
                        <div style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                          zIndex: 99999,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '10px'
                          }}>
                            <label htmlFor="resourceGroupName">Resource Group Name:</label>
                            <input 
                              id="resourceGroupName" 
                              value={inputRG} 
                              onChange={(e) => setInputRG(e.target.value)} 
                            />
                            <button 
                              onClick={() => {
                                setSelectedRG(inputRG);
                                setshowRG(false);
                              }}
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="region">Region:</label>
                      <select onChange={(e) => setSelectedRegion(e.target.value)}>
                        <option value="">Select a region</option>
                        {regions.map((region) => (
                          <option key={region.value} value={region.value}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <h2>Looks like you don't have a resource group and lab plan</h2>
                  <p>Please fill out:</p>
                  <div className="form-container">
                    <div className="form-group">
                      <label htmlFor="resourceGroup">Resource Group:</label>
                      <input
                        type="text"
                        id="resourceGroup"
                        className="resource-group-input"
                        value={selectedRG}
                        onChange={(e) => setSelectedRG(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="labPlanTitle">Lab Plan Title:</label>
                      <input
                        type="text"
                        id="labPlanTitle"
                        className="lab-plan-title-input"
                        value={labPlanTitle}
                        onChange={(e) => setLabPlanTitle(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="region">Region:</label>
                      <select onChange={(e) => setSelectedRegion(e.target.value)}>
                        <option value="">Select a region</option>
                        {regions.map((region) => (
                          <option key={region.value} value={region.value}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}
              <div className="form-group">
                <button type="submit" className="submit-button" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            </div>
        </div>

      );
    }
    

  return (
      <div>
        <Labs />
        <ACG />
        <Category />
      </div>
    );
  };

  return <div>{renderContent()}
  <Footer />

  
  </div>;
};

export default Page;
