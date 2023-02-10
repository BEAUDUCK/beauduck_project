package com.ssafy.beauduckauth.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfileResponseDto {
    private String nickName;
    private String img;
    private String content;
    private int exp;
    private String badge;
    private ZonedDateTime created_date;
    private ZonedDateTime updated_date;

}
