import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/types';
import store from '../../redux/store';
import { fetchLabs } from '../../redux/actions/labs';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GetImage from '../../hook/image';
import useCreate from '../../hook/labCreate';
import useGallery from '../../hook/galleryCreate';
import axios from "axios";
import './Popup.css';
import { regions } from '../Page';
import LabPlanDropdown from '../../component/lpdown';
import ResourceGroupDropdown from '../../component/rgdown';
import Credential from '../../component/credential';
import DefaultRegion from '../../component/defaultregion';
import Region from '../../component/region';
import NewLP from '../../component/newLP';


interface PopupProps {
  show: boolean;
  selectedACG: any;

  handleClose: () => void;
}
type AllowedRegion = {
  name: string;
  displayName: string;
};
const PopupThree: React.FC<PopupProps> = ({ show, selectedACG, handleClose }) => {
  const labplans = useSelector((state: AppState) => state.labPlans.data);
  const rgs = useSelector((state: AppState) => state.rgs.data);
  const accessToken = useSelector((state: AppState) => state.token.accessToken);
  const [selectedLP, setselectedLP] = useState('');
  const selectedLabPlan = labplans?.find((labplan) => labplan.id.name === selectedLP);
  
  const imageName = selectedACG?.id.name;
  const galleryName = selectedACG?.id.parent.name;
  const galleryRGtemp = selectedACG?.id.parent.parent.name;
  const galleryRegion = selectedACG?.location.name;
  const galleryRG = rgs?.find(rg => typeof rg?.id.name === 'string' && rg?.id.name.toLowerCase() === galleryRGtemp?.toLowerCase())?.id.name;
  const osType = selectedACG?.osType;

  //labTitle
  //login
  //password
  //students
  //custom
  //selectedLabPlan
  //csvData
  
  const [newLP, setShowNewLP] = useState(false);
  const [selectedRG, setSelectedRG] = useState('');
  const [inputRG, setInputRG] = useState("");
  
  const [ newLPtitle, setNewLPtitle] = useState('');
  const [showRG, setShowRG] = useState(false);

  const [labTitle, setLabTitle] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [students, setStudents] = useState('');
  const [custom, setCustom] = useState(true);
  const allowedRegions = selectedLabPlan?.data.allowedRegions || [];
  const [selectedRegion, setSelectedRegion] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordTouched, setPasswordTouched] = useState(false);
  
  
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<AppState, unknown, any>>();

  const [submitClicked, setSubmitClicked] = useState(false);

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
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
      setCustom(false);
      setShowContent2(false);
      setselectedLP('');
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
  
  const handleSubmit = () => {
    if (csvData) {
      localStorage.setItem(`csvData_${labTitle}`, csvData);
    }
    console.log(`selectedLP: ${selectedLP}`);
    console.log(`selectedLabPlan: `, selectedLabPlan);
    console.log(`newLP: ${osType}`);
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

  useGallery({
    submitClicked,
    selectedACG,
    selectedLabPlan,
    labTitle,
    login,
    password,
    students,
    custom,
    galleryName,
    galleryRG,
    galleryRegion,
    imageName,
    osType,
    accessToken,
    csvData,
  })

 
  
  

  

  return (
    <div className={`popup ${show ? "popup-show" : ""}`} onClick={handleBackgroundClick}>
      <div className="popup-content" style={{ display: showContent2 ? "none" : "block" }}>
        <div className="popup-header">
          <p>{selectedACG?.id.name}</p>          
            <button className="popup-close" onClick={handleClose}>&times;</button>
        </div>
        <div className="popup-body">
          {selectedACG?.osType === 0 ? "Windows" : "Linux"}
            <p>{selectedACG?.id.parent.name}</p>
            <p>{selectedACG?.id.parent.parent.name}</p>  
        </div>
        
        
          <p>{labplans && <LabPlanDropdown selectedLP={selectedLP} labplans={labplans} handleLPChange={handleLPChange} />}</p>
          <button onClick={() => setShowNewLP(true)}>New</button>
          {newLP && 
            <NewLP 
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
          <div>
            <p><label>Lab Title: <input type="text" value={labTitle} onChange={(e) => setLabTitle(e.target.value)} /></label></p>
            <p>Region: {galleryRegion}
          </p>

            <Credential setLogin={setLogin} setPassword={setPassword} />
              {passwordTouched ? <p>{errorMessage}</p> : null}
              <p><label>Students: <input type="text" value={students} onChange={(e) => setStudents(e.target.value)} /></label></p>
            </div>

            <div className="customize-section">
              <p className="customize-text">Customize?</p>
              <div className="radio-buttons">
                <label className="radio-label">
                  <input type="radio" value="yes" checked={custom} onChange={() => setCustom(true)} />
                  Yes
                </label>
                <label className="radio-label">
                  <input type="radio" value="no" checked={!custom} onChange={() => setCustom(false)} />
                  No
                </label>
              </div>
            </div>
            

            <button className="popup-next" onClick={handleNextClick}
            disabled={!labTitle || !login || !password || !students || !selectedLP}>
            Next
            </button>
      </div>
      <div className="popup-content2" style={{ display: showContent2 ? "block" : "none" }}>
        <div className="popup-header">
          <h2>User Invitation</h2>
          <button className="popup-close" onClick={handleClose}>
            &times;
          </button>
        </div>
        <button className="popup-close" onClick={handleClose}></button>
        <div className="email-list-container">
        <label htmlFor="emailList">Email List:</label>
        <textarea
          id="emailList"
          value={csvData || ""}
          placeholder="Paste a list of emails here..."
          onChange={(e) => setCsvData(e.target.value)}
        />
      </div>
      <div className="csv-file-container">
      <label htmlFor="csvFile">CSV File:</label>
      <input
        type="file"
        id="csvFile"
        accept=".csv"
        onChange={handleFileUpload}
      />
    </div>
        <button className="popup-back" onClick={handleBackClick}>
          Back
        </button>
        <p>If you want to invite user urself please click slip</p>
        <p>You would have to publish and invite user urself</p>
        
        <button className="submit-button">Skip</button>
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
        
      </div>
    </div>
  );
};

export default PopupThree;
