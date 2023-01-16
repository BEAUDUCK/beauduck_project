## 실행 방법
```
npm i
```
```
npm start
```

---

## GET - 멤버 리스트 전체 조회

### 💻 MemberList.js
▫ React App   

▫ useEffect 를 통해 컴포넌트가 mount 될 때, axios 요청을 보내 전체 멤버 리스트를 받아오는 middleware 함수(thunk)인 getMember를 dispatch함    

▫ useSelector 를 사용하여 state에 저장된 members 데이터를 사용함 (connect와 같은 용도)    

> 기존 MemberList와 MemberContainer로 분리되어 있던 컴포넌트를 하나로 합쳤습니다.

<br>

### 🔨 modules/member.js  
▫ Action - Middleware - Reducer 로 구성됨   

<br>

### ⚙ api/member.js
▫ Rest API의 axios 요청을 처리하는 비동기 함수