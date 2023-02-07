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
import { getAccessToken } from '../api/cookie';
import { UserLogin, getNickName } from '../features/login/MemberSlice';
import { useDispatch } from 'react-redux';

const SignupPage = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [nickName, setNickName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const accessToken = getAccessToken();

  const [imgFile, setImgFile] = useState('');
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

  // 닉네임 길이 + 중복 확인
  const handleSubmit = async (e) => {
    setNickName(e.target.value);

    e.preventDefault();

    if (nickName.length > 1) {
      NickNameCheck(nickName);
    } else {
      setErrorMessage('닉네임의 길이가 너무 짧습니다.');
    }
  };

  // 닉네임 중복 확인
  const NickNameCheck = async (nickName) => {
    axios
      .get(`http://3.38.169.2:8080/members/check/${nickName}`)
      .then((res) => {
        console.log(res.data.data)
        if (!res.data.data) {
          setErrorMessage('사용 가능한 닉네임입니다');
        } else {
          setErrorMessage('중복된 닉네임입니다.');
        }
      });
  };

  // 회원가입
  const Signup = async (e) => {
    e.preventDefault();

    console.log('회원가입');
    const data = {
      accessToken,
      nickName,
      content,
      img: '',
    };

    axios
      .post('http://3.38.169.2:8080/naver/signup', data)
      .then((res) => {
        dispatch(getNickName(nickName));
        dispatch(UserLogin(accessToken));
        alert('회원가입 완료');
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
        alert('가입할 수 없습니다.');
      });
  };

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
                className="imgbox"
                src={imgFile ? imgFile : '/images/default.png'}
                alt="사진"
              ></img>
              <input
                className="input-box"
                type="file"
                accept="image/*"
                onChange={saveImgFile}
                ref={imgRef}
              ></input>

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
                <p>{errorMessage ? errorMessage : ' '}</p>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="outlined-multiline-static"
                    label="자기소개를 입력해주세요"
                    multiline
                    fullWidth
                    rows={4}
                    // defaultValue=""
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <p>
                    완료하기 버튼을 클릭하면 BeauDuck의 약관, 개인정보처리방침
                    및 쿠키 정책에 동의하게 됩니다.
                  </p>
                </Grid>
              </Grid>
              <Button
                onClick={Signup}
                type="submit"
                fullWidth
                variant="outlined"
                color="success"
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
