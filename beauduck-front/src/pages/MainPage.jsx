import logo from '../assets/logo_original.png';

// 스타일 App.css 에 넣음
const MainPage = () => {
  return (
    <>
      <div className="main-ban">
        <img className="main-logo" src={logo} alt="logo" />
      </div>
    </>
  );
};

export default MainPage;
