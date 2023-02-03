import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const SignupPage = () => {
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    
  };
  const theme = createTheme();
  return (
    <div>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >

          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
          <img
            className = "imgbox"
            src={
              imgFile
                ? imgFile
                : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png`}
              alt="사진">
          </img>
          <input
            className='input-box'
            type="file"
            accept="image/*"
            onChange={saveImgFile}
            ref={imgRef}></input>

            <br></br>
            <br></br>
            <br></br>

            <Grid container spacing={3}>

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="outlined-required"
                  label="Required"
                  fullWidth
                  defaultValue="닉네임을 입력해주세요."
                /> 
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="Multiline"
                  multiline
                  fullWidth
                  rows={4}
                  defaultValue="Default Value"
                />     
              </Grid>
              
              <Grid item xs={12}>
                <p>완료하기 버튼을 클릭하면 BeauDuck의 약관, 개인정보처리방침 및 쿠키 정책에 동의하게 됩니다.</p>
              </Grid>
            </Grid>
            <Button
              onClick={() => navigate('/')}
              type="submit"
              fullWidth
              variant="outlined"
              color = "success"
              sx={{ mt: 3, mb: 2 }}
            >
              완료하기
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
      </div>
  );
};
export default SignupPage;