import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './module/rootReducer';

// redux devTool
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// reducer 와 devTool 을 가진 store 생성
const store = createStore(rootReducer, devTools);

// Provider 는 자식 컴포넌트 App 이 store 의 state 를 사용할 수 있도록 해준다.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);