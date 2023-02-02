// import axios from "axios"
// import { TokenExpiredCheck } from "./TokenExpiredCheck"

// const refresh = () => {
//   const refreshToken = res.data.data.refreshToken
//   const instance = axios.create({
//     baseURL: 'http://i8b306.p.ssafy.io:8080/',
//     headers: {
//       "Content-type": "application/json",
//     },
//   })
//   // request insterceptor 요청 전 헤더에 토큰 등록
//   instance.interceptors.request.use(
//     (config) => {
//       // access token 만료 시
//       if (TokenExpiredCheck()) {
//         console.log("리프레쉬 토큰으로 요청 ")
//         axios
//           .get(`http://i8b306.p.ssafy.io:8080/refresh?refreshsToken=${refreshToken}`, {
//             headers: {
//             refreshToken: localStorage.getItem("refreshToken"),
//             },
//             })
//             .then((res) => {
//               console.log("새로운 토큰 받음 ", res.data)
//               config.headers["refreshToken"] =
//                 localStorage.getItem("refreshToken")})
//             .catch((err) => {
//               console.log("토큰 발급 요청 에러 ", err)
//             })
//         }
//     },
//     (error) => {
//       return Promise.reject(error)
//     }
//   )
//   // response interceptor 요청 응답 받은 후 데이터 가공
//   instance.interceptors.response.use(
//     (response) => {
//       return response
//     },
//     (error) => {
//       console.log("Axios 에러입니다.", error)
//     }
//   )
//   return instance
// }

//   export default refresh;