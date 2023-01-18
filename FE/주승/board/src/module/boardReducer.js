// Action Type
const MODE_REMOVE = 'REMOVE';
const MODE_SAVE = 'SAVE';
const MODE_SELECT_ROW = 'SELECT_ROW';

// Action Create Function
export const boardSave = (saveData) => ({
    type: MODE_SAVE,
    saveData: {
        boardId: saveData.boardId,
        boardTitle: saveData.boardTitle,
        boardContent: saveData.boardContent
    }
});
export const boardRemove = (boardId) => ({
    type: MODE_REMOVE,
    boardId: boardId
});
export const boardSelectRow = (boardId) => ({
    type: MODE_SELECT_ROW,
    boardId: boardId
});

// initState
const initialState = {
    boards: [
    ],
    lastId: 0,
    selectRowData: {}
}

// Reducer
export default function boardReducer(state=initialState, action) {

    switch(action.type) { // 클릭한 boardId 를 가지지 않은 data 만 return
        case MODE_REMOVE:
            return {
                ...state, boards: state.boards.filter(row => 
                    row.boardId !== action.boardId)
            };
        case MODE_SAVE:
            if(action.saveData.boardId === '') { // boardId 가 없다면 신규 데이터 저장
                return {
                    lastId: state.lastId+1,
                    boards: state.boards.concat({
                        ...action.saveData, 
                        boardId: state.lastId+1
                    }), 
                    selectRowData: {}
                };
            } else { // boardId 가 있다면 기존 데이터 수정
                return { ...state, boards: state.boards.map(data => data.boardId === action.saveData.boardId ? {...action.saveData}: data), selectRowData: {} };
            }
            
        case MODE_SELECT_ROW:
            return { // 클릭한 셀의 boardId 를 가진 state 만 찾아서 return
                ...state,
                selectRowData: state.boards.find(row => row.boardId === action.boardId)
            };
        default:
            return state;
    }
}