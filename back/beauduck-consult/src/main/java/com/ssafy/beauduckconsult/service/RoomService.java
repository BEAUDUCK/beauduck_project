package com.ssafy.beauduckconsult.service;


import com.ssafy.beauduckconsult.dto.common.response.ResponseSuccessDto;
import com.ssafy.beauduckconsult.dto.redis.*;
import com.ssafy.beauduckconsult.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.beauduckconsult.errorhandling.exception.service.RequestErrorException;
import com.ssafy.beauduckconsult.repository.RoomRepository;
import com.ssafy.beauduckconsult.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RoomService {

    private final ResponseUtil responseUtil;
    private final RoomRepository roomRepository;


    //전체 방 목록 조회
    public ResponseSuccessDto<List<RoomDto>> selectAll() {
        List<RoomDto> roomDtoList = roomRepository.findAllRoom();
        ResponseSuccessDto<List<RoomDto>> res = responseUtil.successResponse(roomDtoList);
        return res;
    }

    //방 생성
    public ResponseSuccessDto<RoomCreateResponseDto> createRoom(RoomRequestDto dto) {
        if (dto.getTitle() == null || dto.getContent() == null || dto.getHostId() == null || dto.getHostNickname() == null) {
            throw new RequestErrorException("dto 데이터가 부족합니다.");
        }

        RoomDto roomDto = RoomDto.create(dto.getTitle(), dto.getContent(), dto.getHostId(), dto.getHostNickname());
        UserInfoDto user = UserInfoDto.create(roomDto.getRoomId(), dto.getHostId(), dto.getHostNickname());

        if (!roomRepository.createChatRoom(roomDto, user))
            throw new RuntimeException("방 생성 실패");
        return responseUtil.successResponse(new RoomCreateResponseDto(roomDto.getRoomId()));
    }

    public ResponseSuccessDto<Boolean> deleteRoom(String roomId) {
        return responseUtil.successResponse(roomRepository.deleteRoom(roomId));
    }


    public ResponseSuccessDto<RoomResponseDto> enterRoom(UserInfoDto userInfoDto) {
        RoomDto roomDto = roomRepository.findRoomById(userInfoDto.getRoomId());
        if (roomDto == null) {
            throw new EntityIsNullException("roomId에 대한 room 데이터가 존재하지 않습니다.");
        }

        List<UserResponseDto> newList = roomDto.getUserList();
        UserResponseDto userResponseDto = new UserResponseDto(userInfoDto.getUserId(), userInfoDto.getNickname());
        newList.add(userResponseDto);
        roomDto.setUserList(newList);
        roomDto.setUserCount(roomDto.getUserList().size());

        if(!roomRepository.setUserEnterInfo(userInfoDto.getUserId(), userInfoDto, roomDto)){
            throw new RequestErrorException("방 입장 실패");
        }
        return responseUtil.successResponse(RoomResponseDto.builder().message("방 입장 성공").build());
    }

    public ResponseSuccessDto<RoomResponseDto> outRoom(UserInfoDto userInfoDto) {
        RoomDto roomDto = roomRepository.findRoomById(userInfoDto.getRoomId());
        if (roomDto == null) {
            throw new EntityIsNullException("roomId에 대한 데이터가 존재하지 않습니다.");
        }

        if (userInfoDto.getUserId().equals(roomDto.getHostId())) {
            if(!roomRepository.deleteRoom(roomDto.getRoomId())){
                throw new EntityIsNullException("방 삭제 실패");
            }
            return responseUtil.successResponse(RoomResponseDto.builder().message("방 삭제 완료").build());

        }

        List<UserResponseDto> newList = roomDto.getUserList();
        UserResponseDto userResponseDto = new UserResponseDto(userInfoDto.getUserId(), userInfoDto.getNickname());
        newList.remove(userResponseDto);
        roomDto.setUserList(newList);
        roomDto.setUserCount(roomDto.getUserList().size());
        if(!roomRepository.removeUserEnterInfo(userInfoDto.getUserId(), userInfoDto, roomDto)){
            throw new RuntimeException("퇴장 실패");
        }
        return responseUtil.successResponse(RoomResponseDto.builder().message("퇴장 완료").build());
    }

    public ResponseSuccessDto<RoomDto> selectOne(String roomId) {
        RoomDto roomDto = roomRepository.findRoomById(roomId);
        if(roomDto == null){
            throw new EntityIsNullException("roomId에 해당하는 방이 존재하지 않습니다.");
        }
        return responseUtil.successResponse(roomDto);
    }


}
