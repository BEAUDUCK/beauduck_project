package com.ssafy.beauduckmakeup.controller;
import com.ssafy.beauduckmakeup.dto.MakeupExecuteRequestDto;
import com.ssafy.beauduckmakeup.dto.MakeupRequestDto;
import com.ssafy.beauduckmakeup.dto.MakeupResponseDto;
import com.ssafy.beauduckmakeup.service.MakeupService;
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
@RequestMapping("/makeup")
@Api("따라해덕 컨트롤러 API V1")
public class MakeupController {

    @Autowired
    private MakeupService service;

    @ApiOperation(value = "메이크업 저장", notes = "새로운 메이크업 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @PostMapping("/")
    public ResponseEntity<String> write(@ApiParam(value = "BoardInfoRequestDto", required = true) @RequestBody MakeupRequestDto dto){
        if(service.insert(dto)) {
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "메이크업 목록 조회", notes = "메이크업 목록을 조회한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @GetMapping("/")
    public ResponseEntity<List<MakeupResponseDto>> selectAll(){
        List<MakeupResponseDto> makeupList = service.selectAll();
        if(makeupList!=null) {
            return new ResponseEntity<List<MakeupResponseDto>>(makeupList, HttpStatus.OK);
        }
        return new ResponseEntity<List<MakeupResponseDto>>(makeupList, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "메이크업 상세 정보 조회", notes = "메이크업 상세정보를 조회한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @GetMapping("/{makeupId}")
    public ResponseEntity<MakeupResponseDto> selectOne(@ApiParam(value = "int", required = true) @PathVariable int makeupId){
        MakeupResponseDto makeup = service.selectOne(makeupId);
        if(makeup!=null) {
            return new ResponseEntity<MakeupResponseDto>(makeup, HttpStatus.OK);
        }
        return new ResponseEntity<MakeupResponseDto>(makeup, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "메이크업 실행 정보 조회", notes = "메이크업 실행 시 필요한 정보를 조회한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @PostMapping("/execute")
    public ResponseEntity<MakeupResponseDto> selectExecute(@ApiParam(value = "MakeupExecuteRequestDto", required = true) @RequestBody MakeupExecuteRequestDto dto) {
        MakeupResponseDto makeup = service.selectExecute(dto);
        if(makeup!=null) {
            return new ResponseEntity<MakeupResponseDto>(makeup, HttpStatus.OK);
        }
        return new ResponseEntity<MakeupResponseDto>(makeup, HttpStatus.NO_CONTENT);
    }


}
