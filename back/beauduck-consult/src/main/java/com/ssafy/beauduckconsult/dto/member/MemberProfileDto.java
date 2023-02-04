package com.ssafy.beauduckconsult.dto.member;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.beauduckconsult.entity.MemberEntity;
import com.ssafy.beauduckconsult.entity.MemberProfileEntity;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
public class MemberProfileDto {

//    private String memberId;
    private MemberEntity memberEntity;
    private int exp;
    private int badge;

    @Builder
    public MemberProfileEntity ToEntity(){

       // MemberEntity memberEntity = new MemberEntity(memberId);
        return MemberProfileEntity.builder()
                .memberEntity(memberEntity)
                .exp(exp)
                .badge(badge)
                .build();
    }

}
