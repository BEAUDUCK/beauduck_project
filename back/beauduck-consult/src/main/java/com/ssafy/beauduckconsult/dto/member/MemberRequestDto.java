package com.ssafy.beauduckconsult.dto.member;

import com.ssafy.beauduckconsult.entity.MemberEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Id;

@Data
@NoArgsConstructor
public class MemberRequestDto {

    private String id;

    @Builder
    public MemberEntity ToEntity(){
        return MemberEntity.builder()
                .id(id)
                .build();
    }

}
