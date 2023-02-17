package com.ssafy.beauducktogether.controller;


import com.ssafy.beauducktogether.dto.RoomDto;
import com.ssafy.beauducktogether.dto.RoomRequestDto;
import com.ssafy.beauducktogether.dto.UserInfoDto;
import com.ssafy.beauducktogether.service.RoomService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/together")
public class TogetherRoomController {

    private final RoomService roomService;

    @ApiOperation(value = "미팅룸 목록 조회", notes = "현재 활성화된 미팅룸 목록을 조회한다.", response = String.class)
    @GetMapping("") // 방 목록전체
    public ResponseEntity<List<RoomDto>> selectAll() {
        List<RoomDto> roomDtoList = roomService.selectAll();
        if(roomDtoList == null)
            return new ResponseEntity<List<RoomDto>>(roomDtoList, HttpStatus.NO_CONTENT);
        return new ResponseEntity<List<RoomDto>>(roomDtoList, HttpStatus.OK);
    }
    @ApiOperation(value = "미팅룸 생성", notes = "미팅룸이 생성한다. . 생성에 성공하면 SUCCESS를, 실패하면 FAIL을 리턴한다. ", response = String.class)
    @PostMapping("") // 방 생성
    public ResponseEntity<String> createRoom(@RequestBody RoomRequestDto dto) {
        if(roomService.createRoom(dto))
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }

    // 방 파괴
    @ApiOperation(value = "미팅룸 삭제", notes = "미팅룸이 삭제된다. 삭제에 성공하면 SUCCESS를, 실패하면 FAIL을 리턴한다. ", response = String.class)
    @DeleteMapping("/{roomId}") // 방이 삭제 되면 자동으로 유저들도 삭제 되는거 확인함
    public ResponseEntity<String> deleteRoom(@PathVariable String roomId) {
        if(roomService.deleteRoom(roomId))
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        return new ResponseEntity<String>("FAIL", HttpStatus.BAD_REQUEST);
    }



    // 방 상세 조회
    @ApiOperation(value = "미팅룸 정보 상세 조회", notes = "미팅룸 상세정보를 조회한다.", response = String.class)
    @GetMapping("/{roomId}")
    public ResponseEntity<RoomDto> selectOne(@PathVariable String roomId) {
        RoomDto roomDto = roomService.selectOne(roomId);
        if(roomDto != null)
            return new ResponseEntity<RoomDto>(roomDto, HttpStatus.OK);
        return new ResponseEntity<RoomDto>(roomDto, HttpStatus.NO_CONTENT);
    }

    // 방에 유저 입장
    @ApiOperation(value = "미팅룸 유저 입장", notes = "미팅룸에 유저가 입장한다. 성공하면 SUCCESS를, 실패하면 FAIL을 리턴한다.", response = String.class)
    @PostMapping("/enter")
    public ResponseEntity enterRoom(@RequestBody UserInfoDto userInfoDto){
        boolean result = roomService.enterRoom(userInfoDto);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }

    // 방 나감
    @ApiOperation(value = "미팅룸 유저 퇴장", notes = "미팅룸에서 유저가 나간다. 성공하면 SUCCESS를, 실패하면 FAIL을 리턴한다.", response = String.class)
    @PostMapping("/out")
    public ResponseEntity outRoom(@RequestBody UserInfoDto userInfoDto){
        boolean result = roomService.outRoom(userInfoDto);
        if (result)
            return new ResponseEntity<String>("success", HttpStatus.ACCEPTED);
        else
            return new ResponseEntity<String>("fail", HttpStatus.BAD_REQUEST);
    }

}
