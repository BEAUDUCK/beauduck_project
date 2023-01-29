import ExitModal from '../../components/modal/ExitModal';

const SingelModalNoRecommend = () => {
  return (
    <>
      <ExitModal
        title={'추천받기'}
        content={'저장된 사진이 없습니다. \n 마이페이지에서 사진을 저장하세요.'}
        where={'/profile'}
        whereText={'마이페이지'}
      />
    </>
  );
};

export default SingelModalNoRecommend;
