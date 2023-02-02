package com.ssafy.beauduckboard.controller;

import com.ssafy.beauduckboard.dto.qa.BoardQaRequestDto;
import com.ssafy.beauduckboard.dto.qa.BoardQaResponseDto;
import com.ssafy.beauduckboard.service.BoardQaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Api("질문 게시판 컨트롤러 API")
@RequestMapping(path="/board/qa")
public class BoardQaController {

    private final BoardQaService boardQaService;

//    @ApiOperation(value = "질문 게시글 작성", notes = "질문 게시판 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
//    @PostMapping("/")
//    public ResponseEntity<String> insert(@RequestBody BoardQaRequestDto request) {
//        boolean result = boardQaService.insert(request);
//        if (result)
//            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
//        else
//            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
//    }

    @ApiOperation(value = "질문 게시글 작성", notes = "질문 게시판 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/")
    public ResponseEntity<Integer> insert(@RequestBody BoardQaRequestDto request) {
        return new ResponseEntity<Integer>(boardQaService.insert(request), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "질문 게시글 리스트 전체 조회", notes = "질문 게시판 정보를 리스트 보기한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @GetMapping("/")
    public ResponseEntity<List<BoardQaResponseDto>> selectAll(){
        List<BoardQaResponseDto> boardQaResponseDtoList= boardQaService.selectAll();
//        System.out.println(boardQaResponseDtoList.get(0).getMemberId());
        return new ResponseEntity(boardQaResponseDtoList, HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "질문 게시글 삭제", notes = "성공하면 success.", response = String.class)
    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> delete(@ApiParam(value = "board_id", required = true, example="10") @PathVariable("boardId") int id){
        boolean result = boardQaService.delete(id);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }


    @ApiOperation(value = "질문 게시글 수정", notes = "질문 게시글의 id값을 받고 수정한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PutMapping("/{boardId}")
    public ResponseEntity<?> update(@ApiParam(value = "board_id", required = true, example="10") @PathVariable("boardId") int  id,
                                        @ApiParam(value = "BoardQaRequestDto", required = true) @RequestBody BoardQaRequestDto request){
        boolean result = boardQaService.update(id, request);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }
    
    @ApiOperation(value = "질문 게시글 조회", notes = "성공하면 success.", response = String.class)
    @GetMapping("/{boardId}")
    public ResponseEntity<?> selectOne(@ApiParam(value = "board_id", required = true, example="10") @PathVariable("boardId") int  id){
        return new ResponseEntity(boardQaService.selectOne(id), HttpStatus.ACCEPTED);
    }



}
