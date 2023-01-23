import './Single.style.scss';
import Banner from '../components/banner/Banner';
import SingleList from '../features/single/SingleList';
import SingleModalCreate from '../features/single/SingleModalCreate ';
import SingleModalExitSurvey from '../features/single/SingleModalExitSurvey';

const SinglePage = () => {
  const testList = [
    {
      id: 1,
      title: '데일리 메이크업',
      score: 4.5,
      count: 120,
      img: 'https://i.pinimg.com/236x/00/23/13/0023139711735d03774be660adcad98c.jpg',
    },
    {
      id: 2,
      title: '물광 메이크업',
      score: 4.3,
      count: 20,
      img: 'https://i.pinimg.com/236x/86/2f/31/862f310c3e879aefcbf50748758e32cc.jpg',
    },
    {
      id: 3,
      title: '데일리 메이크업',
      score: 4.5,
      count: 120,
      img: 'https://i.pinimg.com/236x/00/23/13/0023139711735d03774be660adcad98c.jpg',
    },
    {
      id: 4,
      title: '물광 메이크업',
      score: 4.3,
      count: 20,
      img: 'https://i.pinimg.com/236x/86/2f/31/862f310c3e879aefcbf50748758e32cc.jpg',
    },
    {
      id: 5,
      title: '데일리 메이크업',
      score: 4.5,
      count: 120,
      img: 'https://i.pinimg.com/236x/00/23/13/0023139711735d03774be660adcad98c.jpg',
    },
    {
      id: 6,
      title: '물광 메이크업',
      score: 4.3,
      count: 20,
      img: 'https://i.pinimg.com/236x/86/2f/31/862f310c3e879aefcbf50748758e32cc.jpg',
    },
  ];

  return (
    <>
      <Banner bannerStyle={'single-ban'} />
      <div className="container">
        <button className="makeup-recommend-btn">
          나에게 어울리는 메이크업 추천 받기
        </button>
        <h2 className="single-h2">인기 메이크업</h2>
        <hr className="single-hr" />
        <SingleList modeList={testList} />
        <SingleModalCreate />
        <SingleModalExitSurvey />
      </div>
    </>
  );
};

export default SinglePage;
