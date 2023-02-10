import * as React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import './Login.style.scss';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { goToLogin, goToSignup } from './MemberSlice';

function SimpleDialog(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleListItemClick = (value) => {
    onClose(value);
  };
  const REDIRECT_URI = 'http://i8b306.p.ssafy.io:3000/Api/Naver';
  const CLIENT_ID = 'V5gN96q3kFtGfUK7PUds';
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=STATE_STRING&redirect_uri=${REDIRECT_URI}`;

  const isLogin = () => {
    dispatch(goToLogin());
  };
  const isSignup = () => {
    dispatch(goToSignup());
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle style={{ fontFamily: 'Jalnan', fontSize: '40px' }}>
        뷰덕
      </DialogTitle>
      <List>
        <ListItem disableGutters>
          <ListItemButton autoFocus onClick={() => handleListItemClick()}>
            <ListItemAvatar>
              <a href={NAVER_AUTH_URL} onClick={isLogin}>
                <img src="/images/naver.png" width="250" height="60" />
              </a>
            </ListItemAvatar>
          </ListItemButton>
          <ListItemButton autoFocus onClick={() => handleListItemClick()}>
            <ListItemAvatar>
              <a
                href={NAVER_AUTH_URL}
                onClick={isSignup}
                className="signup-btn"
              >
                회원가입
              </a>
            </ListItemAvatar>
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
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
        Login
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
