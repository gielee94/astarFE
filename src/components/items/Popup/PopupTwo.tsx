import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/types';
import store from '../../redux/store';
import { fetchLabs } from '../../redux/actions/labs';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GetImage from '../../hook/image';
import useACreate from '../../hook/advancedCreate';
import Resource from '../../component/resource';

import Credential from '../../component/credential';
import AdvancedLP from '../../component/advancedLP';
import './Popup.css';

interface PopupProps {
  show: boolean;
  item: any;
  handleClose: () => void;
}
type AllowedRegion = {
  name: string;
  displayName: string;
};
const PopupTwo: React.FC<PopupProps> = ({ show, item, handleClose }) => {
  const labplans = useSelector((state: AppState) => state.labPlans.data);
  const accessToken = useSelector((state: AppState) => state.token.accessToken);
  const [labTitle, setLabTitle] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [students, setStudents] = useState('');
  
  const [selectedLP, setselectedLP] = useState('');
  const selectedLabPlan = labplans?.find((labplan) => labplan.id.name === selectedLP);
  const allowedRegions = selectedLabPlan?.data.allowedRegions || [];
  const [selectedRegion, setSelectedRegion] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [newLP, setShowNewLP] = useState(false);
  
  const [selectedRG, setSelectedRG] = useState('');
  const [inputRG, setInputRG] = useState("");
  const rgs = useSelector((state: AppState) => state.rgs.data);
  const [ newLPtitle, setNewLPtitle] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);
  const apiData = accessToken && labplans ? GetImage(item, accessToken, labplans) : null;
  const osType = apiData?.data.osType;
  
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<AppState, unknown, any>>();

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  
  const handleLPChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedLP(event.target.value);
  };

  const [csvData, setCsvData] = useState<string | null>(null);
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCsvData(reader.result as string);
      };
      reader.readAsText(file);
    }
  };

  const [showContent2, setShowContent2] = useState(false);
  const handleNextClick = () => {
    setShowContent2(true);
  };
  const handleBackClick = () => {
    setShowContent2(false);
  };


  useEffect(() => {
    if (!show) {
      setLabTitle('');
      setLogin('');
      setPassword('');
      setStudents('');
      setselectedLP('');
      setShowContent2(false);
      setSelectedRegion('');
      setCsvData('');
      setSubmitClicked(false);
      
    }
  }, [show]);
  
  useEffect(() => {
    if (passwordTouched) { // Only check password if password input field has been interacted with
      if (password.length < 8 || password.length > 123) {
        setErrorMessage("Password must be between 8~123 characters.");
      } else if (
        !(
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password) &&
          /\d/.test(password) &&
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
        )
      ) {
        setErrorMessage(
          "Password must include 3 of the following: a number, uppercase character, lowercase character, or a special character."
        );
      } else {
        setErrorMessage("");
      }
    }
  }, [password, passwordTouched]);
  
  useEffect(() => {
    const labPlan = labplans?.find(labPlan => labPlan.data.id.name === selectedLP);
    setSelectedRegion(labPlan?.data.location.name || '');
  }, [selectedLP, labplans]);

  
  const handleSubmit = () => {
    if (csvData) {
      localStorage.setItem(`csvData_${labTitle}`, csvData);
    }
    console.log(`selectedLP: ${selectedLP}`);
    console.log(`selectedLabPlan: `, selectedLabPlan);
    console.log(`apiData: `, apiData);
    console.log(`newLP: ${newLP}`);
    console.log(`selectedRG: ${selectedRG}`);
    console.log(`inputRG: ${inputRG}`);
    
    console.log(`labTitle: ${labTitle}`);
    console.log(`login: ${login}`);
    console.log(`password: ${password}`);
    console.log(`students: ${students}`);
    
    console.log(`allowedRegions: `, allowedRegions);
    console.log(`selectedRegion: ${selectedRegion}`);
    console.log(`errorMessage: ${errorMessage}`);
    console.log(`passwordTouched: ${passwordTouched}`);

    setSubmitClicked(true);
  };

  useACreate({
    submitClicked,
    accessToken,
    apiData,
    selectedLP,
    labTitle,
    login,
    password,
    students,
    imageName: item?.identifier,
    item
  })
  useEffect(() => {
    if (passwordTouched) { // Only check password if password input field has been interacted with
      if (password.length < 8 || password.length > 123) {
        setErrorMessage("Password must be between 8~123 characters.");
      } else if (
        !(
          /[a-z]/.test(password) &&
          /[A-Z]/.test(password) &&
          /\d/.test(password) &&
          /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
        )
      ) {
        setErrorMessage(
          "Password must include 3 of the following: a number, uppercase character, lowercase character, or a special character."
        );
      } else {
        setErrorMessage("");
      }
    }
  }, [password, passwordTouched]);

  
  
  

  return (
    <div className={`popup ${show ? "popup-show" : ""}`} onClick={handleBackgroundClick}>
      <div className="popup-content" style={{ display: showContent2 ? "none" : "block" }}>
        <div className="popup-header">
          <img src={apiData?.data.iconUri} alt={item?.title} />
          <button className="popup-close" onClick={handleClose}>
            &times;
          </button>
        </div>
        <div className="popup-body">
          <h2>{item?.title}</h2>
          <p style={{display: "none"}}>{item?.identifier}</p>
          <p style={{display: "none"}}>{item?.advanced}</p>
          <p dangerouslySetInnerHTML={{ __html: apiData?.data.description }}></p>
        </div>
        <p>Lab Plan
          <select value={selectedLP}onChange={handleLPChange}>
            <option value="">Select a lab plan popuptwo</option>
            {labplans?.filter((labplan) => labplan.data.defaultNetworkSubnetId && labplan.data.defaultNetworkSubnetId.name).map((labplan) =>(
              <option key={labplan.id.name} value={labplan.id.name}>
                {labplan.id.name}
              </option>
            ))}
          </select>
        </p>
        <button onClick={() => setShowNewLP(true)}>New</button>
        <div>
          <p><label>Lab Title: <input type="text" value={labTitle} onChange={(e) => setLabTitle(e.target.value)} /></label></p>
          <p>Region:
            {labplans && selectedLP &&
              <span>
                {
                  labplans.find(labPlan => labPlan.data.id.name === selectedLP)?.data.location.name
                }
              </span>
            }
          </p>

        {newLP && 
            <AdvancedLP
              rgs={rgs} 
              selectedRG={selectedRG}
              newLPtitle={newLPtitle}
              setSelectedRG={setSelectedRG}
              setNewLPtitle={setNewLPtitle}
              selectedRegion={selectedRegion} 
              setSelectedRegion={setSelectedRegion} 
              setShowNewLP={setShowNewLP} 
              inputRG={inputRG}
              setInputRG={setInputRG}
              setselectedLP={setselectedLP}
            />
          }

            <Credential setLogin={setLogin} setPassword={setPassword} />
              {passwordTouched ? <p>{errorMessage}</p> : null}
              <p><label>Students: <input type="text" value={students} onChange={(e) => setStudents(e.target.value)} /></label></p>

            <Resource students={students} selectedLP={selectedLP} selectedRegion={selectedRegion} osType = {osType} />
                        </div>


            

            <button className="popup-next" onClick={handleNextClick}
            disabled={!labTitle || !login || !password || !students || !selectedLP}>
            Next
          </button>
          
      </div>
      <div className="popup-content2" style={{ display: showContent2 ? "block" : "none" }}>
        <div className="popup-header">
          <h2>Advanced Lab Setting</h2>
          <button className="popup-close" onClick={handleClose}>
            &times;
          </button>
        </div>
        <button className="popup-close" onClick={handleClose}></button>
        <h3>Please follow this <a style={{color: 'blue'}} href="https://learn.microsoft.com/en-us/azure/lab-services/tutorial-create-lab-with-advanced-networking" target="_blank">Instruction</a></h3>
        <p>You have to create two labs to fully utilize advanced network feature!</p>
        
        

        <button className="popup-back" onClick={handleBackClick}>
          Back
        </button>
        
        
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default PopupTwo;
