package com.ssafy.beauduckauth.dto.member;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class AiRequestDto {
    private String memberId;
    private String img;

    AiRequestDto(String memberId, String img){
        this.memberId = memberId;
        this.img = img;
    }
}
