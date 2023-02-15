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
  const newsTitle = infoNews[0].title.replace('&apos;', '');
  const blogTitle = infoBlog[0].title.replace('/', '').replace(/<b>/g, ' ');

  const newsContent = infoNews[0].description
    .replace('/', '')
    .replace(/<b>/g, ' ');

  const blogContent = infoBlog[0].description
    .replace('/', '')
    .replace(/<b>/g, ' ');

  const goToNews = () => {
    window.open(infoNews[0].link);
  };
  const goToBlog = () => {
    window.open(infoBlog[0].link);
  };

  const goToShop = (idx) => {
    window.open(infoShop[idx].link);
  };

  return (
    <div className="crawling-div">
      <div className="news-div">
        <h1>오늘의 뉴스</h1>
        <h3>{newsTitle}</h3>
        <div className="content-div">
          <p>{newsContent}</p>
          <img src={speech} alt="speech" className="speech" />
        </div>
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
        <div className="content-div">
          <p>{blogContent}</p>
          <img src={speech} alt="speech" className="speech" />
        </div>
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
        <h1>메이크업 제품</h1>
        {infoShop.map((item, idx) => (
          <div className="shop-item">
            <div>
              <img
                src={item.image}
                alt=""
                className="shop-img"
                onClick={() => goToShop(idx)}
              />
            </div>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crawling;
