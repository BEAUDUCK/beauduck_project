package com.ssafy.beauduckconsult.controller;



import com.ssafy.beauduckconsult.dto.member.MemberProfileDto;
import com.ssafy.beauduckconsult.dto.redis.RoomDto;
import com.ssafy.beauduckconsult.dto.redis.RoomRequestDto;
import com.ssafy.beauduckconsult.dto.redis.UserInfoDto;
import com.ssafy.beauduckconsult.service.MemberService;
import com.ssafy.beauduckconsult.service.RoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<List<RoomDto>> selectAll() {
        List<RoomDto> roomDtoList = roomService.selectAll();
        if(roomDtoList == null)
            return new ResponseEntity<List<RoomDto>>(roomDtoList, HttpStatus.NO_CONTENT);
        return new ResponseEntity<List<RoomDto>>(roomDtoList, HttpStatus.OK);
    }

    @ApiOperation(value = "도와덕 방 생성", notes = "DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/") // 방 생성
    public ResponseEntity<String> createRoom(@ApiParam(value = "RoomRequestDto", required = true) @RequestBody RoomRequestDto dto) {
        if(roomService.createRoom(dto))
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }

    // 방 파괴
    @ApiOperation(value = "도와덕 방 파괴", notes = "DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @DeleteMapping("/{roomId}") // 방이 삭제 되면 자동으로 유저들도 삭제 되는거 확인함
    public ResponseEntity<String> deleteRoom(@ApiParam(value = "roomId", required = true) @PathVariable String roomId) {
        if(roomService.deleteRoom(roomId))
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }



    // 방 상세 조회
    @ApiOperation(value = "도와덕 방 상세조회", notes = "DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomDto> selectOne(@ApiParam(value = "roomId", required = true) @PathVariable String roomId) {
        RoomDto roomDto = roomService.selectOne(roomId);
        if(roomDto != null)
            return new ResponseEntity<RoomDto>(roomDto, HttpStatus.OK);
        return new ResponseEntity<RoomDto>(roomDto, HttpStatus.NO_CONTENT);
    }

    // 방에 유저 입장
    @ApiOperation(value = "도와덕 방 유저 입장", notes = "DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/enter")
    public ResponseEntity enterRoom(@ApiParam(value = "UserInfoDto", required = true) @RequestBody UserInfoDto userInfoDto){
        boolean result = roomService.enterRoom(userInfoDto);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }

    // 방 나감
    @ApiOperation(value = "도와덕 방 유저 퇴장", notes = "DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PostMapping("/out")
    public ResponseEntity outRoom(@ApiParam(value = "UserInfoDto", required = true) @RequestBody UserInfoDto userInfoDto){
        boolean result = roomService.outRoom(userInfoDto);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }



    @ApiOperation(value = "멤버 경험치 수정", notes = "멤버 경험치를 받고 수정한다. 그리고 DB입력 성공여부에 따라 'success' 또는 'fail' 문자열을 반환한다.", response = String.class)
    @PutMapping("/exp")
    public ResponseEntity<?> update(@ApiParam(value = "MemberProfileDto", required = true) @RequestBody MemberProfileDto request){
        boolean result = memberService.updateExp(request);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }





    ///////////////////////////////////////////////
//        @GetMapping("/room/user")
//    public ResponseEntity findAllUser() {
//        List<UserInfo> userInfos = roomRepository.findAllUser(); // 방과 유저 정보 반환 -> 방이 삭제 되면 자동으로 유저들도 삭제 되는거 확인함
//        return ResponseEntity.ok().body(userInfos);
//    }

}
