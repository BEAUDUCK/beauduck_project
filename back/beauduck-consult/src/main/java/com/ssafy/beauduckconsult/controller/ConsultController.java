package com.ssafy.beauduckconsult.controller;

import com.ssafy.beauduckconsult.dto.ConsultRequestDto;
import com.ssafy.beauduckconsult.service.ConsultService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Api("도와덕 컨트롤러 API")
@RequestMapping(path="/consult")
public class ConsultController {

    private final ConsultService service;

    @ApiOperation(value = "도와덕 방 생성", notes = "도와덕 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/")
    public ResponseEntity<String> insert(@RequestBody ConsultRequestDto request) {
        boolean result = service.insert(request);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "도와덕 리스트 전체 조회", notes = "도와덕 정보를 리스트 보기한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @GetMapping("/")
    public ResponseEntity<?> selectAll(){
        return new ResponseEntity(service.selectAll(), HttpStatus.ACCEPTED);
    }

    @ApiOperation(value = "도와덕 삭제", notes = "성공하면 success.", response = String.class)
    @DeleteMapping("/{consultID}")
    public ResponseEntity<?> delete(@ApiParam(value = "consultID", required = true, example="10") @PathVariable("consultID") int id){
        boolean result = service.delete(id);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }

}
