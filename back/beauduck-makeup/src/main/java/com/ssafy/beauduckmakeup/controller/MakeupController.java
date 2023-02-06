package com.ssafy.beauduckmakeup.controller;
import com.ssafy.beauduckmakeup.dto.*;
import com.ssafy.beauduckmakeup.service.AwsS3Service;
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
    private MakeupService makeupService;

    @Autowired
    private AwsS3Service awsS3Service;

    @ApiOperation(value = "메이크업 저장", notes = "새로운 메이크업 정보를 입력한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @PostMapping("/")
    public ResponseEntity<String> write(@ApiParam(value = "MakeupRequestDto", required = true) @RequestBody MakeupRequestDto dto) throws Exception{
        //s3에 이미지 저장
        String url = awsS3Service.uploadFileV1(dto.getImg());
        if(makeupService.insert(dto, url)) {
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "메이크업 목록 조회", notes = "메이크업 목록을 조회한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @GetMapping("/")
    public ResponseEntity<List<MakeupResponseDto>> selectAll(){
        List<MakeupResponseDto> makeupList = makeupService.selectAll();
        if(makeupList!=null) {
            return new ResponseEntity<List<MakeupResponseDto>>(makeupList, HttpStatus.OK);
        }
        return new ResponseEntity<List<MakeupResponseDto>>(makeupList, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "메이크업 상세 정보 조회", notes = "메이크업 상세정보를 조회한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @GetMapping("/{makeupId}")
    public ResponseEntity<MakeupResponseDto> selectOne(@ApiParam(value = "int", required = true, defaultValue = "1") @PathVariable int makeupId){
        MakeupResponseDto makeup = makeupService.selectOne(makeupId);
        if(makeup!=null) {
            return new ResponseEntity<MakeupResponseDto>(makeup, HttpStatus.OK);
        }
        return new ResponseEntity<MakeupResponseDto>(makeup, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "메이크업 실행 정보 조회", notes = "메이크업 실행 시 필요한 정보를 조회한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @PostMapping("/execute")
    public ResponseEntity<MakeupResponseDto> selectExecute(@ApiParam(value = "MakeupExecuteRequestDto", required = true) @RequestBody MakeupExecuteRequestDto dto) {
        MakeupResponseDto makeup = makeupService.selectExecute(dto);
        if(makeup!=null) {
            return new ResponseEntity<MakeupResponseDto>(makeup, HttpStatus.OK);
        }
        return new ResponseEntity<MakeupResponseDto>(makeup, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "메이크업 평가 및 나가기", notes = "메이크업을 평가하고 이를 바탕으로 메이크업 점수를 갱신한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @PatchMapping("/end")
    public ResponseEntity<String> updateScore(@ApiParam(value = "MakeupScoreRequestDto", required = true) @RequestBody MakeupScoreRequestDto dto) {
        //최근 메이크업에 저장
        makeupService.addRecentMakeup(dto);

        if(makeupService.updateScore(dto.getId(), dto.getScore()))
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "메이크업 결과 사진 저장", notes = "메이크업 결과 사진을 db에 저장한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @PostMapping("/gallery")
    public ResponseEntity<String> addToGallery(@ApiParam(value = "MemberGalleryRequestDto", required = true) @RequestBody MemberGalleryRequestDto dto) {
        if(makeupService.addToGallery(dto))
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }


//    @ApiOperation(value = "최근 메이크업 저장", notes = "유저가 실행한 메이크업을 최근 메이크업 테이블에 저장 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
//    @PostMapping("/recent")
//    public ResponseEntity<String> addRecentMakeup(@ApiParam(value = "RecentMakeupRequestDto", required = true) @RequestBody RecentMakeupRequestDto dto){
//        if(makeupService.addRecentMakeup(dto)) {
//            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
//        }
//        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
//    }


}
