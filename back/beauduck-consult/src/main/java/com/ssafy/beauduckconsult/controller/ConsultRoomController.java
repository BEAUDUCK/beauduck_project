package com.ssafy.beauduckconsult.controller;


import com.ssafy.beauduckconsult.dto.common.response.ResponseSuccessDto;
import com.ssafy.beauduckconsult.dto.member.MemberProfileDto;
import com.ssafy.beauduckconsult.dto.redis.*;
import com.ssafy.beauduckconsult.service.MemberService;
import com.ssafy.beauduckconsult.service.RoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@Controller
@Api("도와덕 컨트롤러 API")
@RequestMapping("/consult")
public class ConsultRoomController {

    private final RoomService roomService;
    private final MemberService memberService;

    @ApiOperation(value = "도와덕 방 전체 조회", notes = "DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = List.class)
    @GetMapping("/") // 방 목록전체
    public ResponseEntity<ResponseSuccessDto<List<RoomDto>>> selectAll() {
        return ResponseEntity.ok(roomService.selectAll());
    }

    @ApiOperation(value = "도와덕 방 생성", notes = "DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/") // 방 생성
    public ResponseEntity<ResponseSuccessDto<RoomCreateResponseDto>> createRoom(@ApiParam(value = "RoomRequestDto", required = true) @RequestBody @Valid RoomRequestDto dto) {
        return ResponseEntity.ok(roomService.createRoom(dto));
    }

    // 방 파괴
    @ApiOperation(value = "도와덕 방 파괴", notes = "DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @DeleteMapping("/{roomId}") // 방이 삭제 되면 자동으로 유저들도 삭제 되는거 확인함
    public ResponseEntity<ResponseSuccessDto<Boolean>> deleteRoom(@ApiParam(value = "roomId", required = true) @PathVariable String roomId) {
        return ResponseEntity.ok(roomService.deleteRoom(roomId));
    }

    // 방 상세 조회
    @ApiOperation(value = "도와덕 방 상세조회", notes = "DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @GetMapping("/{roomId}")
    public ResponseEntity<ResponseSuccessDto<RoomDto>> selectOne(@ApiParam(value = "roomId", required = true) @PathVariable String roomId) {
        return ResponseEntity.ok(roomService.selectOne(roomId));
    }

    // 방에 유저 입장
    @ApiOperation(value = "도와덕 방 유저 입장", notes = "DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/enter")
    public ResponseEntity<ResponseSuccessDto<RoomResponseDto>> enterRoom(@ApiParam(value = "UserInfoDto", required = true) @RequestBody UserInfoDto userInfoDto){
        return ResponseEntity.ok(roomService.enterRoom(userInfoDto));
    }

    // 방 나감
    @ApiOperation(value = "도와덕 방 유저 퇴장", notes = "DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/out")
    public ResponseEntity<ResponseSuccessDto<RoomResponseDto>> outRoom(@ApiParam(value = "UserInfoDto", required = true) @RequestBody UserInfoDto userInfoDto){
        return ResponseEntity.ok(roomService.outRoom(userInfoDto));
    }

    @ApiOperation(value = "멤버 경험치 수정", notes = "멤버 경험치를 받고 수정한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PutMapping("/exp")
    public ResponseEntity<ResponseSuccessDto<RoomResponseDto>> update(@ApiParam(value = "MemberProfileDto", required = true) @RequestBody MemberProfileDto request){
        return ResponseEntity.ok(memberService.updateExp(request));
    }

}
