package com.ssafy.beauduckmakeup.controller;
import com.ssafy.beauduckmakeup.dto.MakeupRequestDto;
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
}
