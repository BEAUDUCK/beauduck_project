import axios from 'axios';

// 포스트 목록을 가져오는 비동기 함수
export const getMembersAxios = async () => {
  let members = [];
  const result = await axios({
    url: 'http://13.209.252.39:8080/member',
    method: 'get',
  }).then((res) => {
    members = res.data;
  });
  return members;
};
