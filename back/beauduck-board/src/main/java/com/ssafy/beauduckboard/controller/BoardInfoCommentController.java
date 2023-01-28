package com.ssafy.beauduckboard.controller;

import com.ssafy.beauduckboard.dto.info.BoardInfoCommentRequestDto;
import com.ssafy.beauduckboard.dto.info.BoardInfoRequestDto;
import com.ssafy.beauduckboard.service.BoardInfoCommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board/info")
@Api("정보 게시판 댓글 컨트롤러 API V1")
public class BoardInfoCommentController {

    @Autowired
    private BoardInfoCommentService service;

//    @ApiOperation(value = "게시판 댓글 목록 조회", notes = "모든 게시글의 댓글 목록을 조회한다.", response = String.class)
//    @GetMapping("/{id}/comment")
//    public ResponseEntity<List<BoardInfoCommentResponseDto>> selectAll(@ApiParam(value = "int(board_id)", required = true) @PathVariable int id) {
//        List<BoardInfoCommentResponseDto> cmtList = service.selectAll(id);
//        if(cmtList==null)
//            return new ResponseEntity<List<BoardInfoCommentResponseDto>>(cmtList, HttpStatus.NO_CONTENT);
//        return new ResponseEntity<List<BoardInfoCommentResponseDto>>(cmtList, HttpStatus.OK);
//    }

    @ApiOperation(value = "게시판 댓글 작성", notes = "새로운 댓글 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @PostMapping("/{id}/comment")
    public ResponseEntity<String> write(@ApiParam(value = "int(board_id)", required = true) @PathVariable int id, @ApiParam(value = "BoardInfoCommentRequestDto", required = true) @RequestBody BoardInfoCommentRequestDto dto) {
        if(service.insert(dto)>0) {
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "게시판 댓글 수정", notes = "댓글 내용을 수정한다. 그리고 DB수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PatchMapping("/{id}/comment}")
    public ResponseEntity<String> update(@ApiParam(value = "int(comment_id)", required = true) @PathVariable int id, @ApiParam(value = "BoardInfoRequestDto", required = true) @RequestBody BoardInfoCommentRequestDto dto) {
        if(service.update(id, dto)>0) {
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }


}
