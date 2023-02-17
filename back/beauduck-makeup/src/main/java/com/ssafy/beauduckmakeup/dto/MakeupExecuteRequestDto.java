package com.ssafy.beauduckmakeup.dto;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ApiModel(value = "MakeupExecuteRequestDto", description = "메이크업 실행 요청 정보")
public class MakeupExecuteRequestDto {
    private String[] mainList;

    @Builder
    public MakeupExecuteRequestDto(String[] mainList) {
        this.mainList = mainList;
    }
}
