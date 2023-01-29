import Button from '../components/button/Button';
import Color from '../components/color/Color';
import ExitModal from '../components/modal/ExitModal';

const MainPage = () => {
  return (
    <div>
      <h1>메인페이지</h1>
      <ExitModal
        title={'정말 나가시겠습니까?'}
        content={'진행 중이던 세션은 자동으로 종료됩니다.'}
        btnText={'나가기'}
      />
    </div>
  );
};

export default MainPage;
