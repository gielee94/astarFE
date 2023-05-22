import React, { useState, useEffect } from 'react';
import ResourceGroupDropdown from './rgdown';
import DefaultRegion from './defaultregion';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../redux/types';
import { fetchResourceGroups } from '../redux/actions/rg';
import { fetchLabPlans } from '../redux/actions/lp';
import { ThunkDispatch } from 'redux-thunk';

interface NewLPProps {
  rgs: any;
  newLPtitle: string;
  setNewLPtitle: (value: string) => void;
  inputRG: string;
  setInputRG: (value: string) => void;
  selectedRegion: string;
  setSelectedRegion: (value: string) => void;
  setShowNewLP: (value: boolean) => void;
  selectedRG: string;
  setSelectedRG: (value: string) => void;
  setselectedLP: (value: string) => void;
}

const NewLP: React.FC<NewLPProps> = ({
  rgs,
  selectedRG,
  setSelectedRG,
  newLPtitle,
  setNewLPtitle,
  selectedRegion,
  setSelectedRegion,
  setShowNewLP,
  setselectedLP,
}) => {
  const accessToken = useSelector((state: AppState) => state.token.accessToken);
  const dispatch = useDispatch<ThunkDispatch<AppState, unknown, any>>();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [inputRG, setInputRG] = useState("");
  

  const handleSubmit = () => {
    setSelectedRegion(selectedRegion);
    console.log(`Updated selectedRegion: ${selectedRegion}`);
    setselectedLP(newLPtitle);
    console.log(`Updated selectedLP: ${newLPtitle}`);
    setSelectedRG(selectedRG);
    console.log(`Updated selectedRG: ${selectedRG}`);
    
  };

  useEffect(() => {
    console.log('useEffect triggered', submitClicked);
    if (!submitClicked) {
      return;
    }
  
    // Update states inside the useEffect
    setSelectedRegion(selectedRegion);
    console.log(`Updated selectedRegion: ${selectedRegion}`);
    setselectedLP(newLPtitle);
    console.log(`Updated selectedLP: ${newLPtitle}`);
    setSelectedRG(selectedRG);
    console.log(`Updated selectedRG: ${selectedRG}`);
  
    const fetchData = async () => {
      console.log('fetchData called');
      const data = {
        newRG: inputRG,
        lpName: newLPtitle,
        rgName: selectedRG,
        region: selectedRegion,
      };
      console.log('Data to send:', data);
      try {
        const response = await axios.post('https://labsauto20230330224718.azurewebsites.net/api/firstResource', data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Response data:', response.data);
        if (response.data && accessToken) {
          dispatch(fetchResourceGroups(accessToken));
          dispatch(fetchLabPlans(accessToken));
          setShowNewLP(false);
        }
      } catch (error) {
        console.error('Error calling test4 function:', error);
      }
    };
    fetchData();
  }, [submitClicked, accessToken, inputRG, newLPtitle, selectedRG, selectedRegion]);

  return (
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
        <p>
        {rgs && <ResourceGroupDropdown
            rgs={rgs} 
            selectedRG={selectedRG} 
            setSelectedRG={setSelectedRG} 
            inputRG={inputRG} 
            setInputRG={setInputRG}
            setSelectedRegion={setSelectedRegion}
            selectedRegion = {selectedRegion}  // Pass the setInputRG function here
        />}
        </p>
        <p>
          <label htmlFor="labPlanTitle">Lab Plan Title:</label>
          <input
            type="text"
            id="labPlanTitle"
            className="lab-plan-title-input"
            value={newLPtitle}
            onChange={(e) => setNewLPtitle(e.target.value)}
          />
        </p>
        <p>
        <DefaultRegion selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
        </p>  
        <button 
            onClick={() => {
                setSubmitClicked(true);
                handleSubmit();
            }}
            >
            Submit
            </button>
      </div>
    </div>
  )
}

export default NewLP;
