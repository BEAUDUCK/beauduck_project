import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import person1 from '../../assets/person1.png';
import person2 from '../../assets/person2.png';
import speech from '../../assets/speech.png';
import Button from '../../components/button/Button';

const Crawling = () => {
  const { infoNews, infoBlog, infoShop } = useSelector(
    (state) => state.consulting,
  );
  const newsTitle = infoNews.items[0].title.replace('&apos;', '');
  const blogTitle = infoBlog.items[0].title
    .replace('/', '')
    .replace(/<b>/g, ' ');

  const newsContent = infoNews.items[0].description
    .replace('/', '')
    .replace(/<b>/g, ' ');

  // 지금 데이터가 잘못 들어가 있음 나중에 infoShop -> infoBlog
  const blogContent = infoShop.items[0].description
    .replace('/', '')
    .replace(/<b>/g, ' ');

  const goToNews = () => {
    window.open(infoNews.items[0].link);
  };
  const goToBlog = () => {
    window.open(infoShop.items[0].bloggerlink);
  };
  return (
    <div className="crawling-div">
      <div className="news-div">
        <h1>오늘의 뉴스</h1>
        <h3>{newsTitle}</h3>
        <p>{newsContent}</p>
        <img src={speech} alt="speech" className="speech" />
        <img src={person2} alt="person2" id="person2" />

        <div className="href-btn-div">
          <Button
            text={'뉴스 링크 바로 가기'}
            onClickEvent={goToNews}
            btnStyle={'href-btn'}
          />
          <FontAwesomeIcon icon="fa-solid fa-circle-chevron-right" />
        </div>
      </div>
      <div className="blog-div">
        <h1>오늘의 블로그</h1>
        <h3>{blogTitle}</h3>
        {/* <img src={speech} alt="speech" className="speech" /> */}
        <p>{blogContent}</p>
        <img src={speech} alt="speech" className="speech" />
        <img src={person1} alt="person1" id="person1" />
        <div className="href-btn-div">
          <Button
            text={'블로그 링크 바로 가기'}
            onClickEvent={goToBlog}
            btnStyle={'href-btn'}
          />
          <FontAwesomeIcon icon="fa-solid fa-circle-chevron-right" />
        </div>
      </div>
      <div className="shop-div">
        <h1>오늘의 상품</h1>
        <p>
          여기가 말이죠 문제가 뭐냐면 상품이 퍼스널 컬러 찐 진단이 나옴요..
          ㄱ래서 키워드를 makeup으로 바꾸자! 난 천재
        </p>
        <img src={infoBlog.items[0].image} alt="" className="shop-img" />
      </div>
    </div>
  );
};

export default Crawling;
