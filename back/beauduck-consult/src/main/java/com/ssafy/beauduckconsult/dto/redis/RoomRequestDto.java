package com.ssafy.beauduckconsult.dto.redis;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RoomRequestDto {

    @NotNull(message = "title을 입력해주세요!")
    private String title;
    @NotNull(message = "content를 입력해주세요!")
    private String content;
    @NotNull(message = "hostId를 입력해주세요!")
    private String hostId;
    @NotNull(message = "hostNickname을 입력해주세요!")
    private String hostNickname;

}
