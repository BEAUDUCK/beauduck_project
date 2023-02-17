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
@ApiModel(value = "MakeupExecuteRequestDto", description = "메이크업 점수 갱신 요청 정보 & 최근 메이크업 저장 요청 정보")
public class MakeupScoreRequestDto {
    private float score;
    @ApiParam(value = "메이크업 id", required = true)
    private MakeupEntity makeupEntity;
    @ApiParam(value = "멤버 id", required = true)
    private MemberEntity memberEntity;
    @Builder
    public MakeupScoreRequestDto(float score, MakeupEntity makeupEntity, MemberEntity memberEntity) {
        this.score = score;
        this.makeupEntity = makeupEntity;
        this.memberEntity = memberEntity;
    }
}
