// import { useState, useEffect } from 'react';

// const useAccessTokenValidity = () => {
//   const [isTokenValid, setIsTokenValid] = useState(true);

//   useEffect(() => {
//     const accessToken = getAccessTokenFromCookie();
//     const expirationTimestamp = getTokenExpirationTimestamp(accessToken);
//     const currentTimestamp = new Date().getTime();
    
//     if (expirationTimestamp < currentTimestamp) {
//       setIsTokenValid(true);
//     } else {
//       setIsTokenValid(false);
//     }
//   }, []);

//   return isTokenValid;
// };
// export default useAccessTokenValidity;