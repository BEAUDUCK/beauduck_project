package com.ssafy.beauduckmakeup.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMiddleEntity;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter @Setter
@NoArgsConstructor
@ApiModel(value = "MakeupMiddleResponseDto", description = "메이크업 소분류 응답 정보")
public class MakeupMiddleResponseDto {

    private int id;
    @JsonIgnore
    private MakeupMainEntity mainId;
    private String step;
    private String img;
    private String colorCode;
    private String content;

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
    @Builder
    public MakeupMiddleResponseDto(int id, MakeupMainEntity mainId, String step, String img, String colorCode, String content) {
        this.id = id;
        this.mainId = mainId;
        this.step = step;
        this.img = img;
        this.colorCode = colorCode;
        this.content = content;
    }
}
