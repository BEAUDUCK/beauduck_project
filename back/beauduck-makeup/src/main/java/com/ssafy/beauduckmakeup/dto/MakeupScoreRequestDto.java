package com.ssafy.beauduckmakeup.dto;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(value = "MakeupExecuteRequestDto", description = "메이크업 점수 갱신 요청 정보")
public class MakeupScoreRequestDto {
    private int id;
    private float score;
    @Builder
    public MakeupScoreRequestDto(int id, float score) {
        this.id = id;
        this.score = score;
    }
}
