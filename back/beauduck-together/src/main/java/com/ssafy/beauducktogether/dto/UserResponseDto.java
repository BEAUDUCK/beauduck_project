package com.ssafy.beauducktogether.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserResponseDto implements Serializable {

    private String userId; // 유저 번호
    private String nickname;

    public UserResponseDto(String userId, String nickname) {
        this.userId = userId;
        this.nickname = nickname;
    }
}
