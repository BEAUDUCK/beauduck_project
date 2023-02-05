import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ProfileGalleryList from './ProfileGalleryList';
import { 
  gallery,
  galleryopen 
} from './ProfileSlice';

const ProfileGallery = () => {
  // 갤러리 공개여부 함수
  const [value, setValue] = React.useState('공개');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  // 갤러리 데이터
  const GalleryList = [
    {
      img: 'https://i.pinimg.com/236x/b7/74/29/b77429e9fac0fd3efde42b8f66aa0721.jpg',
    }
  ];
  
  return (
    <div> 
      <br />
      {/* 아래부터는 mui form */}
      <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">갤러리 공개 여부</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="공개" control={<Radio />} label="공개" />
        <FormControlLabel value="비공개" control={<Radio />} label="비공개" />
      </RadioGroup>
    </FormControl>
      <ProfileGalleryList modeList={GalleryList} />
    </div>
  );
};

export default ProfileGallery;