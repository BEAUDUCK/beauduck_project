package com.ssafy.beauduckboard.controller;

import com.ssafy.beauduckboard.dto.qa.BoardQaCommentRequestDto;
import com.ssafy.beauduckboard.service.BoardQaCommentService;
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
@RequestMapping(path="/board/qa/comment")
public class BoardQaCommentController {

    private final BoardQaCommentService boardQaCommentService;

    @ApiOperation(value = "질문 게시글에 댓글 작성", notes = "질문 게시판 댓글 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/")
    public ResponseEntity<String> insert(@RequestBody BoardQaCommentRequestDto request) {
        boolean result = boardQaCommentService.insert(request);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "질문 게시판 댓글 리스트 전체 조회", notes = "성공하면 success.", response = String.class)
    @GetMapping("/{boardId}")
    public ResponseEntity<?> selectAll(@ApiParam(value = "board_id", required = true, example="10") @PathVariable("boardId") int  id){
        return new ResponseEntity(boardQaCommentService.selectAll(id), HttpStatus.ACCEPTED);
    }


    @ApiOperation(value = "질문 게시글 댓글 수정", notes = "게시글의 id값을 받고 수정한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PutMapping("/{commentId}")
    public ResponseEntity<?> update(@ApiParam(value = "comment_id", required = true, example="10") @PathVariable("commentId") int  id,
                                           @ApiParam(value = "CommentQaRequestDto", required = true) @RequestBody BoardQaCommentRequestDto request){
        boolean result = boardQaCommentService.update(id, request);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "질문 게시글 댓글 삭제", notes = "성공하면 success.", response = String.class)
    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> delete(@ApiParam(value = "comment_id", required = true, example="10") @PathVariable("commentId") int id){
        boolean result = boardQaCommentService.delete(id);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }

}
