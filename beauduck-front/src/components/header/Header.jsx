import { useNavigate } from 'react-router-dom';
import './Header.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/logo_original.png';
import { useState } from 'react';
import LoginModal from '../../features/login/LoginModal';
import LogoutModal from '../../features/login/LogoutModal';
import { useSelector } from 'react-redux';
import SignupPage from '../../pages/SignupPage';

const Header = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('refreshToken');
  const { memberId } = useSelector((state) => state.member);
  const [isOpen, setMenu] = useState(false);
  const toggleMenu = () => {
    setMenu(isOpen => !isOpen);
  }

  return (
    <nav className="header">
      <div className="header-name"
      onClick={() => navigate('/')}>
        <img className="header-logo" src={logo} alt="logo" />
        <h3>뷰덕</h3>
      </div>
      <ul className={isOpen ? "header-menu" : "header-menu2"}>
        {/* 화면 작아졌을 때 토글로 온 오프 가능능 */}
        {/* <li onClick={() => navigate('/help')}>도와덕</li>
        <li onClick={() => navigate('/single')}>따라해덕</li>
        <li onClick={() => navigate('/together')}>투게덕</li>
        <li onClick={() => navigate('/board')}>쑥덕쑥덕</li>*/}
        <li onClick={() => navigate('/no')}>도와덕</li>
        <li onClick={() => navigate('/no')}>따라해덕</li>
        <li onClick={() => navigate('/no')}>투게덕</li>
        <li onClick={() => navigate('/no')}>쑥덕쑥덕</li>
      </ul>
      <ul className="header-auth">
        {memberId ? (
        <li onClick={() => navigate('/profile')}>
          <FontAwesomeIcon className="user-icon" icon="fa-regular fa-user"/>
        </li>
        ) : null}
        <li className="header-not-auth">
            {!memberId ? <LoginModal /> : <LogoutModal />}
        </li>
      </ul>
      <>
        <FontAwesomeIcon onClick={()=>toggleMenu()}
        className="user-toggle" icon={faBars}/>
      </>
    </nav>
  );
};

export default Header;
