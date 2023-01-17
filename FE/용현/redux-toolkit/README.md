# redux-toolkit
> saga 지원 X   


```
npm install @reduxjs/toolkit
```

▫ redux-toolkit으로 만든 프로젝트의 폴더 구조       
![image](https://user-images.githubusercontent.com/93974908/212797801-7e0da826-faaf-40d3-aa5f-55dabcb997c2.png)

### 지원하는 기능
1. redux-action
   - createAction
   - createSlice 
2. reselect
3. immer의 produce
4. redux-thunk
5. Flux Standard Action 강제화
6. Type Definition

<br>

### configureStore

createStore => configureStore   

``` js
const store = configureStore({
  reducer : ruducers, // 리듀서 들을 정의합니다.
  middleware: [...middlewares], // 미들웨어를 정의해주도록 합니다.
  devTools: process.env.NODE_ENV !== 'production', // devTool 의 옵션을 선택합니다.
})
```

▫  별도의 메소드 없이 바로 미들웨어를 추가 O

<br>

### createAction

``` js
const changeTitle = createAction('CHANGE_TITLE');

const action = changeTitle('todo제목');
// { type: 'CHANGE_TITLE', payload: 'todo제목' }
action.toString // CHANGE_TITLE
```

▫ createAction 함수로 만든 액션으로 호출하게 되면 자동으로 type과 payload 를 생성해줌   

▫ 생성된 액션에 대해 toString 을 호출할경우 type 만 return 하도록 override 되어있는데 이는 아래 createReducer 에서 유용하게 사용됨

▫ 또한 createAction 의 반환값을 커스텀 하고 싶은 경우 2번째 인자에 콜백함수인 prepare를 사용하여 커스텀 할 수 O

``` js
const changeTitle = createAction('CHANGE_TITLE');

const action = changeTitle('todo제목', function prepare(content){
  return {
    payload: {
     content,
     author: 'sungin';
    }
  }
 });
```

▫ 반드시 액션 객체의 형태는 Flux Standard Action 형태로 구성


<br>

### createReducer
``` js
const changeTitle = createAction('CHANGE_TITLE');

const initState = {
  title : ''
};

const todoReducer = createReducer(initState, {
  [changeTitle]: (state, action) => state.title + action.payload,
})
```

▫  immer의 produce 를 자체적으로 지원하기 때문에 따로 코드로 immutable 관리를 하지 않아도 됨    

<br>

### createSlice()
▫ createAction을 통해 따로 액션타입을 정의하지 않아도 자동으로 액션타입을 만들어 줌     

▫ 리듀서 함수의 객체, 슬라이스 이름, 초기 상태 값을 받아들이고 해당 액션 생성자와 액션 유형으로 슬라이스 리듀서를 자동으로 생성

▫ action과 reducer를 하나의 파일에서 관리       
> ducks-pattern 을 공식적으로 지원

▫ createAction, createReducer 함수가 내부적으로 사용되며, createSlice에 선언된 슬라이스 이름을 따라서 reducer와 action 생성자, action type을 자동으로 생성

- name : 해당 모듈의 이름을 작성합니다.
- initialState : 해당 모듈의 초기값을 세팅합니다.
- reducers : 리듀서를 작성합니다. 이때 해당 리듀서의 키값으로 액션함수가 자동으로 생성됩니다..
- extraReducers : 액션함수가 자동으로 생성되지 않는 별도의 액션함수가 존재하는 리듀서를 정의합니다. (선택 옵션 입니다.)

<br>

#### extraReducers
▫ 액션을 따로 정의한 함수에 대한 리듀서를 정의하는 역할
▫ extraReducers에서 정의한 key값은 액션이 자동으로 생성 X       

<br>

### createAsyncThunk

▫ 한개의 비동기 액션에 대해 pending(비동기 호출 전), success(비동기 호출 성공), failure(비동기 호출 실패) 의 상태를 생성하는 것을 지원      

▫ thunk 만을 지원       

``` js
const fetchTodo = createAsyncThunk(
    `todo/fetchTodo`, // 액션 이름을 정의해 주도록 합니다.
    async (todoId, thunkAPI) => { // 비동기 호출 함수를 정의합니다.
        const response = await todoApi.fetchTodoInfo(todoId);
        return response.data
    }
)
```

▫ createAsyncThunk 를 선언하게 되면 첫번째 파라미터로 선언한 액션 이름 에 pending, fulfilled, rejected 의 상태에 대한 action 을 자동으로 생성

▫  AbortController 를 지원하기때문에 thunk를 사용하여도 api에 대한 취소 작업이 가능
