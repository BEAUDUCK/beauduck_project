import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getTokens } from './authSlice';
import { useCookies } from 'react-cookie';

const SaveTokensToCookie = () => {
  const tokens = useSelector(getTokens);
  const [cookies, setCookie] = useCookies(['accessToken', 'refreshToken']);

  useEffect(() => {
    setCookie('accessToken', tokens.accessToken, { path: '/' });
    setCookie('refreshToken', tokens.refreshToken, { path: '/' });
  }, [tokens, setCookie]);

  return null;
};

export default SaveTokensToCookie;