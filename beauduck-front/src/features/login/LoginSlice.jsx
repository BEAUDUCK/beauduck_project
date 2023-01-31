import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const NaverLogin = () => {
  const { code, state } = useParams();
  const dispatch = useDispatch();
  const { accessToken, refreshToken, isFirstLogin } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(fetchNaverLogin({ code, state }));
  }, [dispatch, code]);

  useEffect(() => {
    if (!accessToken || !refreshToken) return;

    axios
      .get(`http://3.38.169.2:8080/naver/callback?code=${code}&state=STRING_STATE`)
      .then((res) => {
        const { data } = res;
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [accessToken, refreshToken, code]);

  return <div>Naver Login</div>;
};

export default NaverLogin;