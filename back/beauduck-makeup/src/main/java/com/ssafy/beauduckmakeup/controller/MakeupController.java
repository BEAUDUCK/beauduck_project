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
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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

    @ApiOperation(value = "메이크업 저장", notes = "새로운 메이크업 정보를 입력한다. 그리고 DB입력에 성공하면 makeupId를, 실패하면 -1을 리턴한다. ", response = String.class)
    @PostMapping("/")
    public ResponseEntity<Integer> write(@ApiParam(value = "MakeupRequestDto", required = true) @RequestBody MakeupRequestDto dto) {
        int id = makeupService.insert(dto);
        if(id >= 0) {
            return new ResponseEntity<Integer>(id, HttpStatus.OK);
        }
        return new ResponseEntity<Integer>(-1, HttpStatus.BAD_REQUEST);
    }

    @ApiOperation(value = "메이크업 썸네일 저장", notes = "메이크업 정보에 썸네일을 추가한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @PostMapping("/img/{makeupId}")
    public ResponseEntity<String> addImg(@RequestParam("img") MultipartFile multipartFile, @PathVariable int makeupId) throws Exception {
        String url = awsS3Service.uploadFileV1(multipartFile);
        if (url != null) {
            makeupService.updateImg(makeupId, url);
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }


    @ApiOperation(value = "메이크업 목록 조회", notes = "메이크업 목록을 조회한다.", response = String.class)
    @GetMapping("/")
    public ResponseEntity<List<MakeupResponseDto>> selectAll(){
        List<MakeupResponseDto> makeupList = makeupService.selectAll();
        if(makeupList!=null) {
            return new ResponseEntity<List<MakeupResponseDto>>(makeupList, HttpStatus.OK);
        }
        return new ResponseEntity<List<MakeupResponseDto>>(makeupList, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "인기 메이크업 10개 조회", notes = "score와 count를 기반으로 인기 메이크업 10개 목록을 조회한다.", response = String.class)
    @GetMapping("/popular")
    public ResponseEntity<List<MakeupResponseDto>> selectTop10() {
        List<MakeupResponseDto> makeupList = makeupService.selectTop10();
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
    @PostMapping("/execute/{makeupId}")
    public ResponseEntity<MakeupResponseDto> selectExecute(@ApiParam(value = "MakeupExecuteRequestDto", required = true) @RequestBody MakeupExecuteRequestDto dto, @PathVariable int makeupId) {
        MakeupResponseDto makeup = makeupService.selectExecute(makeupId, dto);
        if(makeup!=null) {
            return new ResponseEntity<MakeupResponseDto>(makeup, HttpStatus.OK);
        }
        return new ResponseEntity<MakeupResponseDto>(makeup, HttpStatus.NO_CONTENT);
    }

    @ApiOperation(value = "메이크업 평가 및 나가기", notes = "메이크업을 평가하고 이를 바탕으로 메이크업 점수를 갱신한다. 그리고 DB입력 성공여부에 따라 'SUCCESS' 또는 'FAIL' 문자열을 반환한다.", response = String.class)
    @PostMapping("/end")
    public ResponseEntity<String> updateScore(@ApiParam(value = "MakeupScoreRequestDto", required = true) @RequestBody MakeupScoreRequestDto dto) {
        //최근 메이크업에 저장
        makeupService.addRecentMakeup(dto);

        if(makeupService.updateScore(dto.getMakeupEntity().getId(), dto.getScore()))
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
}
