package com.ssafy.beauduckboard.controller;

import com.ssafy.beauduckboard.dto.info.BoardInfoRequestDto;
import com.ssafy.beauduckboard.dto.info.BoardInfoResponseDto;
import com.ssafy.beauduckboard.service.BoardInfoService;
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
@Api("정보 게시판 컨트롤러 API V1")
public class BoardInfoController {

    @Autowired
    private BoardInfoService service;

    @ApiOperation(value = "게시판 글 목록 조회", notes = "모든 게시글 목록을 조회한다.", response = String.class)
    @GetMapping("/")
    public ResponseEntity<List<BoardInfoResponseDto>> selectAll() {
        List<BoardInfoResponseDto> boardList = service.selectAll();
        if(boardList==null)
            return new ResponseEntity<List<BoardInfoResponseDto>>(boardList, HttpStatus.NO_CONTENT);
        return new ResponseEntity<List<BoardInfoResponseDto>>(boardList, HttpStatus.OK);
    }

    @ApiOperation(value = "게시판 글 상세 조회", notes = "게시글 상세정보를 조회한다.", response = String.class)
    @GetMapping("/{boardId}")
    public ResponseEntity<BoardInfoResponseDto> selectOne(@ApiParam(value = "int(id)", required = true, example = "3") @PathVariable int boardId) {
        BoardInfoResponseDto board = service.selectOne(boardId);
        if(board != null)
            return new ResponseEntity<BoardInfoResponseDto>(board, HttpStatus.OK);
        return new ResponseEntity<BoardInfoResponseDto>(board, HttpStatus.NO_CONTENT);
    }

//    @ApiOperation(value = "게시판 글 작성", notes = "새로운 게시글 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
//    @PostMapping("/")
//    public ResponseEntity<String> write(@ApiParam(value = "BoardInfoRequestDto", required = true) @RequestBody BoardInfoRequestDto dto) {
//        if(service.insert(dto)) {
//            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
//        }
//        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
//    }

    @ApiOperation(value = "게시판 글 작성", notes = "새로운 게시글 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @PostMapping("/")
    public ResponseEntity<Integer> write(@ApiParam(value = "BoardInfoRequestDto", required = true) @RequestBody BoardInfoRequestDto dto) {
        return new ResponseEntity<Integer>(service.insert(dto), HttpStatus.OK);
//        if(service.insert(dto)) {
//            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
//        }
//        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "게시판 글 수정", notes = "게시글 내용을 수정한다. 그리고 DB수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PutMapping("/update/{boardId}")
    public ResponseEntity<String> update(@ApiParam(value = "int(boardId)", required = true, example = "3") @PathVariable int boardId, @ApiParam(value = "BoardInfoRequestDto", required = true) @RequestBody BoardInfoRequestDto dto) {
        if(service.update(boardId, dto.getTitle(), dto.getContent())) {
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "게시판 글 삭제", notes = "게시글 내용을 삭제한다. 그리고 DB수정 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @DeleteMapping("/{boardId}")
    public ResponseEntity<String> delete(@ApiParam(value = "int(id)", required = true, example = "3") @PathVariable int boardId) {
        if(service.delete(boardId)) {
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }

//    @ApiOperation(value = "게시판 좋아요 추가", notes = "게시글의 좋아요 카운트를 증가시킨다. 성공 여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
//    @PatchMapping("/{id}/like")
//    public ResponseEntity<String> addLike(@ApiParam(value = "int(id)", required = true) @PathVariable int id) {
//        if(service.addLikes(id)>0) {
//            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
//        }
//        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
//    }
}
