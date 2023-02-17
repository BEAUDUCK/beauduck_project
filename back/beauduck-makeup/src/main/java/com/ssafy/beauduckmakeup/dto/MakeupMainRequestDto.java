package com.ssafy.beauduckmakeup.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMiddleEntity;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@ApiModel(value = "MakeupMainRequestDto", description = "메이크업 대분류 요청 정보")
public class MakeupMainRequestDto {

    @JsonIgnore
    private MakeupEntity makeupId;
    private String step;
    private List<MakeupMiddleRequestDto> makeupMiddleList = new ArrayList<>();

    public MakeupMainEntity toEntity() {
        return MakeupMainEntity.builder()
                .makeupId(makeupId)
                .step(step)
                .build();
    }
    @Builder
    public MakeupMainRequestDto(MakeupEntity makeupId, String step, List<MakeupMiddleRequestDto> makeupMiddleList) {
        this.makeupId = makeupId;
        this.step = step;
        this.makeupMiddleList = makeupMiddleList;
    }
}