package com.ssafy.beauduckmakeup.dto;

import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMiddleEntity;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "MakeupMiddleRequestDto", description = "메이크업 소분류 요청 정보")
public class MakeupMiddleRequestDto {
    private int id;
    private MakeupMainEntity mainId;
    private String step;
    private String img;
    private String colorCode;
    private String content;

    @Builder
    public MakeupMiddleEntity toEntity() {
        return MakeupMiddleEntity.builder()
                .id(id)
                .mainId(mainId)
                .step(step)
                .img(img)
                .colorCode(colorCode)
                .content(content)
                .build();
    }
}
