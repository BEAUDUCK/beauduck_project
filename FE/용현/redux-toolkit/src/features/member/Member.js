import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { unwrapResult } from '@reduxjs/toolkit';
import { axiosGetMembers } from './memberSlice';

const Member = () => {
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.member);

  useEffect(() => {
    dispatch(axiosGetMembers());
    // const apiAction = dispatch(axiosGetMembers());
    // unwrapResult 함수를 사용할 경우 바로 state의 값을 가져올 수 있다.
    // const members = unwrapResult(apiAction);
  }, [dispatch]);

  console.log(members);

  return (
    <div>
      <div className="memberlist-div">
        {members.map((member) => (
          <div className="member-div" key={member.member_id}>
            {member.member_id} : {member.nickname} - {member.email}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Member;
