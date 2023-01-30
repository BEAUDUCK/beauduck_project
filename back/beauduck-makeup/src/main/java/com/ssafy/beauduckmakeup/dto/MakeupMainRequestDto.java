package com.ssafy.beauduckmakeup.dto;

import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMiddleEntity;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "MakeupMainRequestDto", description = "메이크업 대분류 요청 정보")
public class MakeupMainRequestDto {

    private int id;
    private MakeupEntity makeupId;
    private String step;

    private List<MakeupMiddleRequestDto> makeupMiddleList = new ArrayList<>();

    @Builder
    public MakeupMainEntity toEntity() {
        return MakeupMainEntity.builder()
                .id(id)
                .makeupId(makeupId)
                .step(step)
                .build();
    }
}
