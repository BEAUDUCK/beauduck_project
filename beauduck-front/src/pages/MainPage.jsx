import { useNavigate, Link } from 'react-router-dom';
import './MainPage.style.scss'
// 스타일 App.css 에 넣음
const MainPage = () => {

  const navigate = useNavigate()

  return (
    <>
      <div className="main-ban">
        <section id="section1" >
        </section>
        <div id='main-line' className="demo">
        <a href="#section2">+
            <span></span>scroll</a>
        </div>
        <section id='section2'>
          <div className='section2-1'>
            <div>
              <img className="img-box2-1" src={require("../assets/test.gif")}/>
            </div>
            <div className="txt-box2-1">
              <h1>도와덕</h1>
              <p>다수의 사용자에게 퍼스널 컬러 진단을 무료로 받을 수 있는 서비스입니다. </p>
              {/* 도와덕 링크로 바꾸기 */}
              <Link to="/no">자세히 보기</Link>
            </div>
          </div>
          <div className='section2-2'>
            <div className="txt-box2-2">
              <h1>따라해덕</h1>
              <p>최신 AI 기술로 뷰덕 유저들의 다양한 화장법을 따라해 볼 수 있는 서비스입니다.</p>
              {/* 따라해덕 링크로 바꾸기 */}
              <Link to="/no">자세히 보기</Link>
            </div>
            <div>
              <img className="img-box2-2" src={require("../assets/test.gif")}/>
            </div>
          </div>
          <div className='section2-3'>
            <div className>
              <img className="img-box2-1" src={require("../assets/test.gif")}/>
            </div>
            <div className="txt-box2-1">
              <h1>투게덕</h1>
              <p>화상 채팅을 통해 뷰덕들이 모여 함께 화장 할 수 있는 서비스입니다.</p>
              {/* 투게덕 링크로 바꾸기 */}
              <Link to="/no">자세히 보기</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MainPage;


