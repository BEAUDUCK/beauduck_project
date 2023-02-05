import SingleList from '../single/SingleList';

const ProfileMakeup = () => {
  // 최근 진행 메이크업
  const makeupList = [
    {
      id: 1,
      title: '데일리 메이크업',
      score: 4.5,
      count: 120,
      img: 'https://i.pinimg.com/236x/00/23/13/0023139711735d03774be660adcad98c.jpg',
    },
    {
      id: 2,
      title: '데일리 메이크업2',
      score: 2.8,
      count: 10,
      img: 'https://i.pinimg.com/236x/52/22/27/522227af43d2dbd86cdc28b33128250f.jpg',
    },
    {
      id: 3,
      title: '데일리 메이크업3',
      score: 4.5,
      count: 120,
      img: 'https://i.pinimg.com/236x/0e/5a/48/0e5a48e90580866365a6bb1dbf24613a.jpg',
    },
  ];
  const makeupSelfList = [
    // 내가 만든 메이크업
    {
      id: 1,
      title: '주말 데이트 메이크업~',
      score: 4.9,
      count: 13,
      img: 'https://i.pinimg.com/236x/ac/65/4b/ac654b997604c847b599a3265012061d.jpg',
    },
    {
      id: 2,
      title: '평일 데이트 메이크업~',
      score: 4.9,
      count: 13,
      img: 'https://i.pinimg.com/236x/80/09/29/8009298b7c0d5872e4091c641d616dff.jpg',
    },
    {
      id: 3,
      title: '출근 메이크업',
      score: 4.9,
      count: 13,
      img: 'https://i.pinimg.com/236x/5d/6f/2b/5d6f2b27ec6f6b4311d647770fb2ff27.jpg',
    },
    {
      id: 4,
      title: '메이크업',
      score: 4.3,
      count: 13,
      img: 'https://i.pinimg.com/236x/1a/c8/d7/1ac8d789dd21a1001d7ab8626eaf8c12.jpg',
    },
  ];
  return (
    <div> 
      <h2>최근 진행 메이크업</h2>
      <SingleList modeList={makeupList} />
      <hr/>
      <h2>내가 만든 메이크업</h2>
      <SingleList modeList={makeupSelfList} />
    </div>
  );
};
// SingleList와 서식 동일하여 재사용
export default ProfileMakeup;