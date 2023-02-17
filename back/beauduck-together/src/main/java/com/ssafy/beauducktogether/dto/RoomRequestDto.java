package com.ssafy.beauducktogether.dto;

import lombok.Data;

@Data
public class RoomRequestDto {

    private String title;
    private String content;
    private String hostId;
    private String hostNickname;

}
