package com.ssafy.beauducktogether.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Getter
@NoArgsConstructor
@ApiModel(value = "BoardQaResponseDto : 투게덕 응답 정보", description = "투게덕 응답 정보를 나타낸다.")
public class TogetherResponseDto {

    @ApiParam(value = "투게덕 id", required = true)
    private int id;
    @ApiParam(value = "투게덕 삭제 여부", required = true)
    private Boolean isActive;
    @ApiParam(value = "투게덕 제목", required = true)
    private String title;
    @ApiParam(value = "투게덕 내용", required = true)
    private String content;
    @ApiParam(value = "투게덕 호스트", required = true)
    private String host;
    @ApiParam(value = "생성 시간", required = true)
    private ZonedDateTime created_date;

    @Builder
    public TogetherResponseDto(int id, Boolean isActive, String title,
                               String content, String host, ZonedDateTime created_date) {
        this.id = id;
        this.isActive = isActive;
        this.title = title;
        this.content = content;
        this.host = host;
        this.created_date = created_date;
    }
}
