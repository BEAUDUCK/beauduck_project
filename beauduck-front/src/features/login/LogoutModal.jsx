import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';

import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { getCookie } from '../../api/cookie';



function LogoutModal(props) {
  // console.log('ss')
  const [accessToken, setAccessToken] = useState(getCookie('accessToken'));
  // console.log(accessToken)
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  // console.log('accessToken', JSON.parse(accessToken).accessToken)
  const token = JSON.parse(accessToken).accessToken
  // console.log(token)
  const navigate = useNavigate();
  

  const Logout = async () => {
      const res = await axios.get(`http://i8b306.p.ssafy.io:8080/naver/logout?accessToken=${token}`);
      console.log('로그아웃 시작');
      // console.log(res.data.status);
      removeCookie('accessToken');
      console.log('accessToken 제거 완료');
      localStorage.removeItem('refreshToken');
      console.log('refreshToken 제거 완료');
      navigate('/');
    } 
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
    // console.log('gr')
  Logout()
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>로그아웃하시겠습니까?</DialogTitle>
      <List>
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={handleListItemClick}
          >
            {/* <ListItemAvatar> */}
              {/* <a href={Logout}> */}
              네
              {/* </a> */}
            {/* </ListItemAvatar> */}
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
};

export default function LogoutModalDemo() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <br />
      <Button variant="plain" 
      onClick={handleClickOpen}
      >
        LOGOUT
      </Button>
      <LogoutModal
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}