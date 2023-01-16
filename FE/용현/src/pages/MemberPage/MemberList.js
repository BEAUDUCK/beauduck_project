import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMember } from '../../modules/member';

const MemberList = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.member.members);

  // React App -> Action Creator
  useEffect(() => {
    dispatch(getMember());
  }, [dispatch]);


  return (
    <div>
      <ul>
        {members.map((member) => (
        <li key={member.member_id}>
          {member.member_id} : {member.nickname} - {member.email}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
