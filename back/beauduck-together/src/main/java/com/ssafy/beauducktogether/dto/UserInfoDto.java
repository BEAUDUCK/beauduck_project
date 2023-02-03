package com.ssafy.beauducktogether.dto;


import lombok.Data;

import java.io.Serializable;

/**
 * REDIS 저장 채팅방 유저 정보
 * key: sessionID
 */
@Data
public class UserInfoDto implements Serializable {


    private String roomId; // 방번호
    private String userId; // 유저 번호
    private String nickname;

    public static UserInfoDto create(String roomId, String userId, String nickname) {
        UserInfoDto userInfoDto = new UserInfoDto();
        userInfoDto.roomId = roomId;
        userInfoDto.userId = userId;
        userInfoDto.nickname = nickname;
        return userInfoDto;
    }

}
