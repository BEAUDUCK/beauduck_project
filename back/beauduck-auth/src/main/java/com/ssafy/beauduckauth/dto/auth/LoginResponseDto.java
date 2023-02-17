package com.ssafy.beauduckauth.dto.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponseDto {
    private String memberId;
    private String name;
    private String nickName;
    private String email;
    private String sex;
    private String phoneNumber;
}
