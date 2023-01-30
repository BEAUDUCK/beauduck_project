package com.ssafy.beauducktogether.controller;

import com.ssafy.beauducktogether.dto.TogetherRequestDto;
import com.ssafy.beauducktogether.service.TogetherService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Api("투게덕 컨트롤러 API")
@RequestMapping(path="/together")
public class TogetherController {
    
    private final TogetherService service;

    @ApiOperation(value = "투게덕 방 생성", notes = "투게덕 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/")
    public ResponseEntity<String> insert(@RequestBody TogetherRequestDto request) {
        boolean result = service.insert(request);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "투게덕 리스트 전체 조회", notes = "투게덕 정보를 리스트 보기한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @GetMapping("/")
    public ResponseEntity<?> selectAll(){
        return new ResponseEntity(service.selectAll(), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "질문 게시글 삭제", notes = "성공하면 success.", response = String.class)
    @DeleteMapping("/{together_id}")
    public ResponseEntity<?> delete(@ApiParam(value = "together_id", required = true, example="10") @PathVariable("together_id") int id){
        boolean result = service.delete(id);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }
    
}
