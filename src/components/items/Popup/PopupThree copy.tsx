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
const PopupThree3: React.FC<PopupProps> = ({ show, selectedACG, handleClose }) => {
  const labplans = useSelector((state: AppState) => state.labPlans.data);
  const rgs = useSelector((state: AppState) => state.rgs.data);
  const accessToken = useSelector((state: AppState) => state.token.accessToken);
  const [selectedLP, setselectedLP] = useState('');
  const selectedLabPlan = labplans?.find((labplan) => labplan.id.name === selectedLP);
  
  
  const apiData = selectedACG;
  
  const [newLP, setShowNewLP] = useState(false);
  const [selectedRG, setSelectedRG] = useState('');
  const [inputRG, setInputRG] = useState("");
  
  const [ newLPtitle, setNewLPtitle] = useState('');
  const [showRG, setShowRG] = useState(false);

  
  const [labTitle, setLabTitle] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [students, setStudents] = useState('');
  const [isCustomizeChecked, setIsCustomizeChecked] = useState(true);
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

  const updateRegion = (newRegion: string) => {
    setSelectedRegion(newRegion);
  };
  
  const updateLP = (newLP: string) => {
    setselectedLP(newLP);
  };

  
  const [showContent2, setShowContent2] = useState(false);
  const handleNextClick = () => {
    setShowContent2(true);
  };
 

  useEffect(() => {
    if (!show) {
      setLabTitle('');
      setLogin('');
      setPassword('');
      setStudents('');
      setIsCustomizeChecked(false);
      setShowContent2(false);
      setselectedLP('');
      setSelectedRegion('');
      
    }
  }, [show]);

 
 
  

  
  
  const handleSubmit = () => {
    console.log(`selectedLP: ${selectedLP}`);
    console.log(`selectedLabPlan: `, selectedLabPlan);
    console.log(`apiData: `, apiData);
    console.log(`newLP: ${newLP}`);
    console.log(`selectedRG: ${selectedRG}`);
    console.log(`inputRG: ${inputRG}`);
    console.log(`newLPtitle: ${newLPtitle}`);
    console.log(`showRG: ${showRG}`);
    console.log(`labTitle: ${labTitle}`);
    console.log(`login: ${login}`);
    console.log(`password: ${password}`);
    console.log(`students: ${students}`);
    console.log(`isCustomizeChecked: ${isCustomizeChecked}`);
    console.log(`allowedRegions: `, allowedRegions);
    console.log(`selectedRegion: ${selectedRegion}`);
    console.log(`errorMessage: ${errorMessage}`);
    console.log(`passwordTouched: ${passwordTouched}`);

    setSubmitClicked(true);
    
  };
  

  

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
        
        
          <p>{labplans && <LabPlanDropdown labplans={labplans} handleLPChange={handleLPChange} />}</p>
          <button onClick={() => setShowNewLP(true)}>New</button>
          
          <div>
            <p><label>Lab Title: <input type="text" value={labTitle} onChange={(e) => setLabTitle(e.target.value)} /></label></p>
            <p><Region allowedRegions = {allowedRegions} handleRegionChange={handleRegionChange}/></p>

            <Credential setLogin={setLogin} setPassword={setPassword} />
              {passwordTouched ? <p>{errorMessage}</p> : null}
              <p><label>Students: <input type="text" value={students} onChange={(e) => setStudents(e.target.value)} /></label></p>
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
        
    </div>
        </div>
  );
};

export default PopupThree3;
