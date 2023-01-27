package com.ssafy.beauduckboard.dto.qa;

import com.ssafy.beauduckboard.entity.BoardQaEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Getter
@NoArgsConstructor
@ApiModel(value = "BoardQaRequestDto : 질문 게시판 요청 정보", description = "질문 게시판 요청 정보를 나타낸다.")
public class BoardQaRequestDto {

    @ApiParam(value = "질문 게시판 member_id", required = true)
    private String memberId;
    @ApiParam(value = "질문 게시판 제목", required = true)
    private String title;
    @ApiParam(value = "질문 게시판 작성자", required = true)
    private String writer;
    @ApiParam(value = "질문 게시판 내용", required = true)
    private String content;
    @ApiParam(value = "질문 게시판 삭제 여부", required = true)
    private Boolean isActive;

    @Builder
    public BoardQaEntity ToEntity() {
        return BoardQaEntity.builder()
                .memberId(memberId)
                .title(title)
                .writer(writer)
                .content(content)
                .isActive(isActive)
                .build();
    }

}
