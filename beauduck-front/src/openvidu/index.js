import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VideoRoomComponent from './components/VideoRoomComponent';
import registerServiceWorker from './registerServiceWorker';
import CustomRoomComponent from './components/CustomRoomComponent';
import { Provider } from 'react-redux';
import { store } from "./store"
import HelpPage from './components/HelpPage';

ReactDOM.render(
  <Provider store={store}>
    <HelpPage 
      id="root"
      host={"내가 호스트다"}
      // user={nickname}
      // sessionName={title}
    />
  </Provider>, document.getElementById("root")
);
registerServiceWorker();
