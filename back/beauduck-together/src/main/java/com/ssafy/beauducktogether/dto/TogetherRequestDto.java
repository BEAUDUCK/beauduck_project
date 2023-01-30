package com.ssafy.beauducktogether.dto;

import com.ssafy.beauducktogether.entity.TogetherEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;

@Getter
@NoArgsConstructor
@ApiModel(value = "BoardQaRequestDto : 투게덕 요청 정보", description = "투게덕 요청 정보를 나타낸다.")
public class TogetherRequestDto {


    @ApiParam(value = "투게덕 삭제 여부", required = true)
    private Boolean isActive;
    @ApiParam(value = "투게덕 제목", required = true)
    private String title;
    @ApiParam(value = "투게덕 내용", required = true)
    private String content;
    @ApiParam(value = "투게덕 호스트", required = true)
    private String host;

    @Builder
    public TogetherEntity ToEntity(){
        return TogetherEntity.builder()
                .isActive(isActive)
                .content(content)
                .title(title)
                .host(host)
                .build();
    }

}
