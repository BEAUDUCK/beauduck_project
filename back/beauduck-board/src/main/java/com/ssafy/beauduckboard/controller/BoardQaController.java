package com.ssafy.beauduckboard.controller;

import com.ssafy.beauduckboard.dto.qa.BoardQaRequestDto;
import com.ssafy.beauduckboard.dto.qa.CommentQaRequestDto;
import com.ssafy.beauduckboard.service.BoardQaService;
import com.ssafy.beauduckboard.service.CommentQaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Api("질문 게시판 컨트롤러 API")
//@RequestMapping(path="/board/qa")
public class BoardQaController {

    private final BoardQaService boardQaService;
    private final CommentQaService commentQaService;

    @ApiOperation(value = "질문 게시판 작성", notes = "질문 게시판 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/board/qa")
    public ResponseEntity<String> createBoard(@RequestBody BoardQaRequestDto request) {
        boolean result = boardQaService.createBoard(request);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }




    @ApiOperation(value = "질문 게시판 리스트 보기", notes = "질문 게시판 정보를 리스트 보기한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @GetMapping("/board/qa")
    public ResponseEntity<?> readBoardList(){
        return new ResponseEntity(boardQaService.readBoardList(), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "질문 게시판 삭제", notes = "성공하면 success.", response = String.class)
    @DeleteMapping("/board/qa/{id}")
    public ResponseEntity<?> deleteBoard(@ApiParam(value = "BoardQaDto", required = true, example="10") @PathVariable("id") int id){
        boardQaService.deleteBoard(id);
        return new ResponseEntity("success", HttpStatus.ACCEPTED);
    }


    @ApiOperation(value = "게시판 수정", notes = "게시글의 id값을 받고 수정한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PatchMapping("/board/qa/{id}")
    public ResponseEntity<?> updateBoard(@ApiParam(value = "BoardDto", required = true, example="10") @PathVariable("id") int  id,
                                        @ApiParam(value = "BoardDto", required = true) @RequestBody BoardQaRequestDto request){
        boolean result = boardQaService.updateBoard(id, request);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }
    
    @ApiOperation(value = "질문 게시판 글 조회", notes = "성공하면 success.", response = String.class)
    @GetMapping("/board/qa/{id}")
    public ResponseEntity<?> readBoard(@ApiParam(value = "BoardDto", required = true, example="10") @PathVariable("id") int  id){
        return new ResponseEntity(boardQaService.readBoard(id), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "질문 게시판 댓글 작성", notes = "질문 게시판 댓글 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/board/qa/comment")
    public ResponseEntity<String> createComment(@RequestBody CommentQaRequestDto request) {
        boolean result = commentQaService.createComment(request);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "질문 게시판 댓글", notes = "성공하면 success.", response = String.class)
    @GetMapping("/board/qa/{id}/comment")
    public ResponseEntity<?> readCommentList(@ApiParam(value = "BoardDto", required = true, example="10") @PathVariable("id") int  id){
        return new ResponseEntity(commentQaService.readCommentList(id), HttpStatus.ACCEPTED);
    }


    @ApiOperation(value = "게시판 댓글 수정", notes = "게시글의 id값을 받고 수정한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PatchMapping("/board/qa/{comment_id}/comment")
    public ResponseEntity<?> updateComment(@ApiParam(value = "BoardDto", required = true, example="10") @PathVariable("comment_id") int  id,
                                         @ApiParam(value = "BoardDto", required = true) @RequestBody CommentQaRequestDto request){
        boolean result = commentQaService.updateComment(id, request);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "질문 게시판 댓글 삭제", notes = "성공하면 success.", response = String.class)
    @DeleteMapping("/board/qa/{comment_id}/comment")
    public ResponseEntity<?> deleteComment(@ApiParam(value = "BoardQaDto", required = true, example="10") @PathVariable("comment_id") int id){
        commentQaService.deleteComment(id);
        return new ResponseEntity("success", HttpStatus.ACCEPTED);
    }

}
