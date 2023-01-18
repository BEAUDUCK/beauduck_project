import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardList from '../component/BoardList';
import BoardNew from '../component/BoardNew';
import { boardRemove, boardSave, boardSelectRow } from '../module/boardReducer';
import {KAKAO_AUTH_URL} from "../component/Login";


function Container() {

    // State
    let [inputData, setInputData] = useState({
        boardId: '',
        boardTitle: '',
        boardContent: ''
    });

    // 함수형 컴포넌트에서 dispatch 를 사용할 수 있게 해줌
    const dispatch = useDispatch();

    // onRemove 와 onSave 는 Action 을 dispatch 하는 함수
    const onRemove = (boardId) => dispatch(boardRemove(boardId));
    const onSave = (saveData) => dispatch(boardSave(saveData));

    // reducer state 의 selectRowData field 를 가져온 뒤 subscribe(구독)
    const {selectRowData} = useSelector(state => state.boardReducer);
    
    // User Function
    const onRowClick = (boardId) => 
    {
        // dispatch 를 하고,
        dispatch(boardSelectRow(boardId));

        // inputData 에 selectRowData 의 값을 반영
        if(JSON.stringify(selectRowData) !== '{}') {
            setInputData({
                boardId: selectRowData.boardId,
                boardTitle: selectRowData.boardTitle,
                boardContent: selectRowData.boardContent
            })
        }
    }

    const changeInput = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }

    const resetForm = () => {
        setInputData({
            boardId: '',
            boardTitle: '',
            boardContent: ''
        })
    }

    // reducer state 의 boards field 를 가져온뒤 subscribe(구독)
    const {boards} = useSelector(state => state.boardReducer);

    return (
        <div>
            <div>
                <table border="1">
                    <tbody>
                        <tr align="center">
                            <td width="50">번호</td>
                            <td width="100">제목</td>
                            <td width="200">내용</td>
                        </tr>
                        {
                            boards.map(row =>
                            (
                                <BoardList 
                                    key={row.boardId}
                                    boardId={row.boardId}
                                    boardTitle={row.boardTitle}
                                    boardContent={row.boardContent}
                                    onRemove={onRemove}
                                    onRowClick={onRowClick}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div>
                <BoardNew 
                    onSave={onSave} 
                    changeInput={changeInput} 
                    inputData={inputData} 
                    resetForm={resetForm}
                />
            </div>
            <br></br>
            <div>
                <a href={KAKAO_AUTH_URL}>
                <span>카카오계정 로그인하기</span>
                </a>
            </div>
        </div>
    );
}

export default Container;