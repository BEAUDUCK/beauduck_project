import { useLocation } from 'react-router';

const ConsultingResultGuestPage = () => {
  const maxIdx = useLocation();
  console.log('게스트 결과 maxIdx', maxIdx);
  return (
    <div className="container">
      <h1>컨설팅 결과 게스트</h1>
    </div>
  );
};

export default ConsultingResultGuestPage;
