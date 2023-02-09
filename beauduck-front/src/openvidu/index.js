import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VideoRoomComponent from './components/VideoRoomComponent';
import registerServiceWorker from './registerServiceWorker';
import CustomRoomComponent from './components/CustomRoomComponent';

ReactDOM.render(
  <CustomRoomComponent
    // user={nickname}
    // sessionName={title}
    host={"내가 호스트다"}
  />, document.getElementById('root')
);
registerServiceWorker();
