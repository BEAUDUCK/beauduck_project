package com.ssafy.beauduckmakeup.dto;

import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import com.ssafy.beauduckmakeup.entity.MemberEntity;
import com.ssafy.beauduckmakeup.entity.RecentMakeupEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(value = "RecentMakeupRequestDto", description = "최근 메이크업 저장 요청 정보")
public class RecentMakeupRequestDto {

    @ApiParam(value = "메이크업 id", required = true)
    private MakeupEntity makeupEntity;
    @ApiParam(value = "멤버 id", required = true)
    private MemberEntity memberEntity;

    @Builder
    public RecentMakeupRequestDto(MakeupEntity makeupEntity, MemberEntity memberEntity) {
        this.makeupEntity = makeupEntity;
        this.memberEntity = memberEntity;
    }


    public RecentMakeupEntity toEntity() {
        return RecentMakeupEntity.builder()
                .makeupEntity(makeupEntity)
                .memberEntity(memberEntity)
                .build();
    }
}
