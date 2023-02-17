package com.ssafy.beauduckauth.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateRequestDto {
    private String memberId;
    private String nickName;
    private String content;
}
