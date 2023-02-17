package com.ssafy.beauduckconsult.dto.member;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberProfileDto {

    private String memberId;
    private int exp;
    private int badge;

}
