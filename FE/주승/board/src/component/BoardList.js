function BoardList({ boardId, boardTitle, boardContent, onRemove, onRowClick }) {

    return (
        <tr>
            <td onClick={() => onRowClick(boardId)}>{boardId}</td>
            <td onClick={() => onRowClick(boardId)}>{boardTitle}</td>
            <td onClick={() => onRowClick(boardId)}>{boardContent}</td>
            <td><button onClick={() => onRemove(boardId)}>삭제</button></td>
        </tr>
    )
}

export default BoardList;