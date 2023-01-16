import { Route, Routes } from 'react-router-dom';
import './App.css';
import ArticlePage from './pages/ArticlePage/ArticlePage';
import LoginPage from './pages/LoginPage/LoginPage';
import MemberList from './pages/MemberPage/MemberList';
import SignupPage from './pages/SignupPage/SignupPage';

function App() {
  return (
    <div className="App">
      <a href="/login">LOGIN</a>
      <a href="/signup">SIGNUP</a>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<ArticlePage />} />
        <Route path="/member" element={<MemberList />} />
      </Routes>
    </div>
  );
}

export default App;
