import ProfileCapture from "./ProfileCapture";
import { useState } from 'react';
import BlackOut from '../../components/blackout/BlackOut';
import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Fade from '@mui/material/Fade';
import FormControlLabel from '@mui/material/FormControlLabel';


const icon = (
  <div>
    <h4>가이드</h4>
    <p> 1. 눈, 눈썹, 코, 입을 전부 보여주세요. </p>
    <p> 2. 카메라 버튼을 클릭하세요.</p>
    
  <ProfileCapture/>
  </div>
);

export default function SimpleFade() {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
  // 아래부터는 mui form
    <Box sx={{ height: 180 }}>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label="Show"
      />
      <Box sx={{ display: 'flex' }}>
        <Fade in={checked}>{icon}</Fade>
      </Box>
    </Box>
  );
}