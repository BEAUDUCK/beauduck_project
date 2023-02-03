package com.ssafy.beauduckconsult.service;


import com.ssafy.beauduckconsult.dto.RoomDto;
import com.ssafy.beauduckconsult.dto.RoomRequestDto;
import com.ssafy.beauduckconsult.dto.UserInfoDto;
import com.ssafy.beauduckconsult.dto.UserResponseDto;
import com.ssafy.beauduckconsult.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RoomService {

    private final RoomRepository roomRepository;


    //전체 방 목록 조회
    public List<RoomDto> selectAll() {
        List<RoomDto> roomDtoList = roomRepository.findAllRoom();
        return roomDtoList;
    }

    //방 생성
    public boolean createRoom(RoomRequestDto dto) {
        if(dto.getTitle()==null || dto.getContent()==null || dto.getHostId()==null || dto.getHostNickname()==null )
            return false;

        RoomDto roomDto = RoomDto.create(dto.getTitle(), dto.getContent(), dto.getHostId(), dto.getHostNickname());
        UserInfoDto user = UserInfoDto.create(roomDto.getRoomId(), dto.getHostId(), dto.getHostNickname());

        if(roomRepository.createChatRoom(roomDto, user))
            return true;
        return false;
    }

    public boolean deleteRoom(String roomId) {
        return roomRepository.deleteRoom(roomId);
    }


    public boolean enterRoom(UserInfoDto userInfoDto){
        RoomDto roomDto = roomRepository.findRoomById(userInfoDto.getRoomId());
        if (roomDto == null) return false;
        List<UserResponseDto> newList = roomDto.getUserList();
        UserResponseDto userResponseDto = new UserResponseDto(userInfoDto.getUserId(), userInfoDto.getNickname());
        newList.add(userResponseDto);
        roomDto.setUserList(newList);
        roomDto.setUserCount(roomDto.getUserList().size());
        return roomRepository.setUserEnterInfo(userInfoDto.getUserId(), userInfoDto, roomDto);
    }

    public boolean outRoom(UserInfoDto userInfoDto){
        RoomDto roomDto = roomRepository.findRoomById(userInfoDto.getRoomId());
        if (roomDto == null) return false;
        if (userInfoDto.getUserId().equals(roomDto.getHostId())){
            return roomRepository.deleteRoom(roomDto.getRoomId());
        }
        List<UserResponseDto> newList = roomDto.getUserList();
        UserResponseDto userResponseDto = new UserResponseDto(userInfoDto.getUserId(), userInfoDto.getNickname());
        newList.remove(userResponseDto);
        roomDto.setUserList(newList);
        roomDto.setUserCount(roomDto.getUserList().size());
        return roomRepository.removeUserEnterInfo(userInfoDto.getUserId(), userInfoDto, roomDto);
    }

    public RoomDto selectOne(String roomId){
        return roomRepository.findRoomById(roomId);
    }


}
