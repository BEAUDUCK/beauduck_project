package com.ssafy.beauduckboard.controller;

import com.ssafy.beauduckboard.dto.qa.BoardQaRequestDto;
import com.ssafy.beauduckboard.service.BoardQaService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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


}
