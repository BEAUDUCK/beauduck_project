import logo from '../assets/main.gif';
import './MainPage.style.scss'
// 스타일 App.css 에 넣음
const MainPage = () => {
  return (
    <>
      <div className="main-ban">
        {/* <img className="main-logo" 
        src={logo} 
        alt="logo" /> */}
        <section id="section01" class="demo">
        <a href="#section02">
            <span>
            </span>Scroll
          </a>
          
        </section>

        <s className='main-line'>
        
        </s>

        <section id='section02'>
          <div className='section02-1'>
            <div className="txt-box">
              <strong>제목제목</strong>
              <p>가치있는 일상을 만들어갑니다.</p>
              <span>자세히 보기</span>
            </div>
            <div className="img-box">
              <img src="/images/logo.png" alt="" />
            </div>
          </div>
          <div className='section02-2'>
            <div className="txt-box">
              <strong>제목제목</strong>
              <p>가치있는 일상을 만들어갑니다.</p>
              <span>자세히 보기</span>
            </div>
            <div className="img-box">
              <img src="/images/logo.png" alt="" />
            </div>
          </div>
          <div className='section02-3'>
            <div className="txt-box">
              <strong>제목제목</strong>
              <p>가치있는 일상을 만들어갑니다.</p>
              <span>자세히 보기</span>
            </div>
            <div className="img-box">
              <img src="/images/logo.png" alt="" />
            </div>
          </div>

        </section>
        
      </div>
    </>
  );
};

export default MainPage;


