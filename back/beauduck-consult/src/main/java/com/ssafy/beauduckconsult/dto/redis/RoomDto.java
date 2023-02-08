package com.ssafy.beauduckconsult.dto.redis;


import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


/**
 * REDIS 저장 채팅방
 * key: roomID
 */
@Data
public class RoomDto implements Serializable {

    private static final long serialVersionUID = 6494678977089006639L;

    private String roomId;
    private String title;
    private String content;
    private String hostId;
    private String hostNickname;
    private long userCount;
    private List<UserResponseDto> userList = new ArrayList<>(); // id, nickname

    public static RoomDto create(String title, String content, String hostId, String hostNickname) {
        RoomDto roomDto = new RoomDto();
        roomDto.roomId = UUID.randomUUID().toString();
        roomDto.title = title;
        roomDto.content = content;
        roomDto.hostId = hostId;
        roomDto.hostNickname = hostNickname;
        roomDto.userCount = 1;
        UserResponseDto userResponseDto = new UserResponseDto(hostId, hostNickname);
        roomDto.userList.add(userResponseDto);
        return roomDto;
    }

}
