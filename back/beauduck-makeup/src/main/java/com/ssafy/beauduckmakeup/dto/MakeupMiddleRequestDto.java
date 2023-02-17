package com.ssafy.beauduckmakeup.dto;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMiddleEntity;
import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter @Setter
@NoArgsConstructor
@ApiModel(value = "MakeupMiddleRequestDto", description = "메이크업 소분류 요청 정보")
public class MakeupMiddleRequestDto {

    @JsonIgnore
    private MakeupMainEntity mainId;
    private String step;
    private String img;
    private String colorCode;
    private String content;

    public MakeupMiddleEntity toEntity() {
        return MakeupMiddleEntity.builder()
                .mainId(mainId)
                .step(step)
                .img(img)
                .colorCode(colorCode)
                .content(content)
                .build();
    }
    @Builder
    public MakeupMiddleRequestDto(MakeupMainEntity mainId, String step, String img, String colorCode, String content) {
        this.mainId = mainId;
        this.step = step;
        this.img = img;
        this.colorCode = colorCode;
        this.content = content;
    }
}
