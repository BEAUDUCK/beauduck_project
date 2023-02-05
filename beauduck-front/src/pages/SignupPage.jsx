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
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getNickName } from '../features/login/MemberSlice';
import { getCookie } from '../api/cookie';



const SignupPage = () => {
  const [content, setContent] = useState("")

  const getAccessToken = getCookie('accessToken');
  const accessToken = JSON.parse(getAccessToken).accessToken
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result)}
  };
  const theme = createTheme();
  const [nickName, setNickName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  // const handleChange = () => {
  //   console.log('주승')
  //   // setNickName()
  //   console.log('입력값 확인')
  //   handleSubmit()
  // }
  const handleSubmit = async (e) => {
    console.log('닉네임 체크 시작')
    setNickName(e.target.value)
    console.log(nickName, "확인")
    
    e.preventDefault()
    if (nickName.length > 0) {
      console.log('닉네임 체크 시작2')
      NickNameCheck(nickName)
    }
    else {
      setErrorMessage("사용가능합니다")
      
    }
    }
  const NickNameCheck = async (nickName) => {
    axios
    .get(`http://i8b306.p.ssafy.io:8080/members/check/${nickName}`)
    .then((res) => {
      console.log(res.data.data, '사용 가능');
      if (res.data.data === false) {  
        setErrorMessage("사용 가능합니다.")
      }
      else {
        setErrorMessage("중복된 닉네임입니다.")
      }
    })}
        // 중복일 경우
  //     alert('중복입니다')
  //     } else {
  //       // 중복이 아닐 경우
  //       dispatch(getNickName(res.data.data))
  //       alert('사용 가능합니다')
  //       console.log('중복이 아닙니다')
  //     } })

  //     .catch((error) => {
  //       console.log('에러_확인용')
  //       console.log(error);
  //     })
  //   };
    const Signup = async () => {
      const data = {
        accessToken,
        nickName,
        content,
        img : ''
      }
      console.log(data)
      axios
      .post('http://i8b306.p.ssafy.io:8080/naver/signup', data)
      .then((res) => {
        console.log(res.data.data);
        alert('회원가입 완료');
        // navigate('/')
      })
      .catch((error) => {
        console.log('에러_확인용')
        console.log(error);
        // LoginComplete()
      })
    }
    // Signup()
    // console.log('회원가입 완료')
    // Login(accessToken);
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
                  label="닉네임(필수)"
                  onChange={handleSubmit}
                  // value={nickName}
                  fullWidth
                  defaultValue=""
                  />
              </Grid>
              <p>
                {errorMessage ? errorMessage : " "}
              </p>
              <Grid item xs={12} sm={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="자기소개를 입력해주세요"
                  multiline
                  fullWidth
                  rows={4}
                  defaultValue=""
                  value={content}
                  onChange={e => setContent(e.target.value)}
                />     
              </Grid>
              
              <Grid item xs={12}>
                <p>완료하기 버튼을 클릭하면 BeauDuck의 약관, 개인정보처리방침 및 쿠키 정책에 동의하게 됩니다.</p>
              </Grid>
            </Grid>
            <Button
              onClick={ 
                Signup
                }
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