import axios from 'axios';

import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ListItemButton from '@mui/material/ListItemButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { getAccessToken, getCookie } from '../../api/cookie';
import { useDispatch } from 'react-redux';
import { removeMember } from './MemberSlice';

function LogoutModal(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = getAccessToken();
  console.log('token', token);

  const Logout = async () => {
    const res = await axios.get(
      `http://3.38.169.2:8080/naver/logout?accessToken=${token}`,
    );
    console.log('로그아웃 시작');
    // console.log(res.data.status);
    removeCookie('accessToken');
    console.log('accessToken 제거 완료');
    localStorage.removeItem('refreshToken');
    console.log('refreshToken 제거 완료');
    dispatch(removeMember());
    navigate('/');
  };
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
    Logout();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>로그아웃하시겠습니까?</DialogTitle>
      <List>
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={handleListItemClick}>
            {/* <ListItemAvatar> */}
            {/* <a href={Logout}> */}네{/* </a> */}
            {/* </ListItemAvatar> */}
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

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
      <Button variant="plain" onClick={handleClickOpen}>
        LOGOUT
      </Button>
      <LogoutModal open={open} onClose={handleClose} />
    </div>
  );
}
