package com.ssafy.beauduckconsult.dto.redis;

import lombok.Data;

@Data
public class RoomRequestDto {

    private String title;
    private String content;
    private String hostId;
    private String hostNickname;

}
