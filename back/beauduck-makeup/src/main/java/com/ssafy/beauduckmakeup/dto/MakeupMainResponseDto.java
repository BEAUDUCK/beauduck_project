package com.ssafy.beauduckmakeup.dto;

import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Data
@NoArgsConstructor
@ApiModel(value = "MakeupMainResponseDto", description = "메이크업 대분류 응답 정보")
public class MakeupMainResponseDto {
    private int id;
    private MakeupEntity makeupId;
    private String step;

    private List<MakeupMiddleResponseDto> makeupMiddleList = new ArrayList<>();

    public MakeupMainEntity toEntity() {
        return MakeupMainEntity.builder()
                .id(id)
                .makeupId(makeupId)
                .step(step)
                .build();
    }

    @Builder
    public MakeupMainResponseDto(int id, MakeupEntity makeupId, String step, List<MakeupMiddleResponseDto> makeupMiddleList) {
        this.id = id;
        this.makeupId = makeupId;
        this.step = step;
        this.makeupMiddleList = makeupMiddleList;
    }
}
