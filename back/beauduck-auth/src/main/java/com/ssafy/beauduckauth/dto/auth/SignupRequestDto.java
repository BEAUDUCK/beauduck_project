package com.ssafy.beauduckauth.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDto {
    private String accessToken;
    private String nickName;
    private String content;
}
