package com.ssafy.beauduckconsult.dto;

import com.ssafy.beauduckconsult.entity.ConsultEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "ConsultRequestDto : 도와덕 요청 정보", description = "도와덕 요청 정보를 나타낸다.")
public class ConsultRequestDto {

    @ApiParam(value = "도와덕 삭제 여부", required = true)
    private Boolean isActive;
    @ApiParam(value = "도와덕 제목", required = true)
    private String title;
    @ApiParam(value = "도와덕 내용", required = true)
    private String content;
    @ApiParam(value = "도와덕 호스트", required = true)
    private String host;

    @Builder
    public ConsultEntity ToEntity(){
        return ConsultEntity.builder()
                .isActive(isActive)
                .content(content)
                .title(title)
                .host(host)
                .build();
    }

}
