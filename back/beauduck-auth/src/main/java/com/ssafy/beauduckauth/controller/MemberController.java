package com.ssafy.beauduckauth.controller;

import com.ssafy.beauduckauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.beauduckauth.dto.makeup.MakeupResponseDto;
import com.ssafy.beauduckauth.dto.member.*;
import com.ssafy.beauduckauth.service.AwsS3Service;
import com.ssafy.beauduckauth.service.MemberService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Api("마이페이지 컨트롤러 V1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final AwsS3Service awsS3Service;

    @ApiOperation(value = "회원 정보 조회", notes = "회원 정보를 조회한다.")
    @GetMapping("/{memberId}")
    public ResponseEntity<ResponseSuccessDto<ProfileResponseDto>> getProfile(@PathVariable("memberId") String memberId){
        return ResponseEntity.ok(memberService.getProfile(memberId));
    }

    @ApiOperation(value = "nickName 중복 확인", notes = "nickName 중복 여부를 확인한다.")
    @GetMapping("/check/{nickName}")
    public ResponseEntity<ResponseSuccessDto<Boolean>> checkNickName(@PathVariable("nickName") String nickName){
        return ResponseEntity.ok(memberService.checkNickName(nickName));
    }

    @ApiOperation(value = "회원 정보 수정", notes = "회원 정보를 수정합니다.")
    @PutMapping("/update")
    public ResponseEntity<ResponseSuccessDto<ProfileResponseDto>> modifyProfile(@RequestBody UpdateRequestDto updateRequestDto){
        return ResponseEntity.ok(memberService.updateProfile(updateRequestDto));
    }

    @ApiOperation(value = "최근 메이크업 목록 조회", notes = "최근에 진행한 메이크업 목록을 조회한다.")
    @GetMapping("/{memberId}/recent-makeup")
    public ResponseEntity<ResponseSuccessDto<List<MakeupResponseDto>>> getRecentMakeup(@PathVariable("memberId") String memberId){
        return ResponseEntity.ok(memberService.getRecentMakeup(memberId));
    }

    @ApiOperation(value = "나의 메이크업 목록 조회", notes = "회원이 저장한 메이크업 목록을 조회한다.")
    @GetMapping("/{memberId}/my-makeup")
    public ResponseEntity<ResponseSuccessDto<List<MakeupResponseDto>>> getMakeup(@PathVariable("memberId") String memberId){
        return ResponseEntity.ok(memberService.getMakeup(memberId));
    }

    @ApiOperation(value = "회원 갤러리 목록 조회", notes = "회원이 저장한 메이크업 이미지 목록을 조회한다.")
    @GetMapping("/{memberId}/gallery")
    public ResponseEntity<ResponseSuccessDto<List<GalleryResponseDto>>> getGalleryList(@PathVariable("memberId") String memberId){
        return ResponseEntity.ok(memberService.getGallery(memberId));
    }

    @ApiOperation(value = "회원 갤러리 공개 여부 수정", notes = "회원 갤러리 공개 여부 수정 처리한다.")
    @PutMapping("/gallery")
    public ResponseEntity<ResponseSuccessDto<String>> changeGalleryIsActive(@RequestBody GalleryActiveRequesetDto galleryActiveRequesetDto){
        return ResponseEntity.ok(memberService.changeGalleryisActive(galleryActiveRequesetDto));
    }
    
    @ApiOperation(value = "회원 사진 등록", notes = "회원 사진을 등록합니다.")
    @PostMapping("/ai/{memberId}")
    public ResponseEntity<ResponseSuccessDto<SaveImageResponseDto>> saveImage(@RequestBody AiRequestDto aiRequestDto) throws Exception {
        return ResponseEntity.ok(memberService.saveImage(aiRequestDto));
    }

}
