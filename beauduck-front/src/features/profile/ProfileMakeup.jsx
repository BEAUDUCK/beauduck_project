import SingleList from '../single/SingleList';

const ProfileMakeup = () => {
  const makeupList = [
    {
      id: 1,
      title: '데일리 메이크업',
      score: 4.5,
      count: 120,
      img: 'https://i.pinimg.com/236x/00/23/13/0023139711735d03774be660adcad98c.jpg',
    }
  ];
  const makeupSelfList = [
    {
      id: 1,
      title: '주말 데이트 메이크업~',
      score: 4.9,
      count: 13,
      img: 'https://i.pinimg.com/236x/ac/65/4b/ac654b997604c847b599a3265012061d.jpg',
    }
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

export default ProfileMakeup;