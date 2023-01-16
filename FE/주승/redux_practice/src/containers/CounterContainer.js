import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {

  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
  }));
  // useSelector() 는 ReduxHooks의 기능 중 하나로 리덕스 스토어의 상태를 조회해주는 기능을 수행
  // useSelector 기능을 사용하게 되면 리덕스 스토어의 상태에 대해 구독 ( subscribe ) 을 수행
  // 리덕스 스토어의 dispatch 를 사용할 수 있도록 해줌.
  const dispatch = useDispatch();

  // 각 액션을 dispatch 하는 함수 생성
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = diff => dispatch(setDiff(diff));

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;