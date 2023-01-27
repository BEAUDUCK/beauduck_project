package com.ssafy.beauduckboard.dto.qa;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.time.ZonedDateTime;

@Getter
@NoArgsConstructor
@ApiModel(value = "BoardQaResponseDto : 질문 게시판 응답 정보", description = "질문 게시판 응답 정보를 나타낸다.")
public class BoardQaResponseDto {

    @ApiParam(value = "질문 게시판 id", required = true)
    private int board_id;
    @ApiParam(value = "질문 게시판 member_id", required = true)
    private String member_id;
    @ApiParam(value = "질문 게시판 작성자", required = true)
    private String writer;
    @ApiParam(value = "질문 게시판 삭제 여부", required = true)
    private Boolean isActive;
    @ApiParam(value = "질문 게시판 제목", required = true)
    private String title;
    @ApiParam(value = "질문 게시판 내용", required = true)
    private String content;
    @ApiParam(value = "질문 게시판 조회수", required = true)
    private int count;
    @ApiParam(value = "질문 게시판 좋아요", required = true)
    private int like;
    @ApiParam(value = "생성 시간", required = true)
    private ZonedDateTime created_date;
    @ApiParam(value = "업데이트 시간", required = true)
    private ZonedDateTime updated_date;

    @Builder
    public BoardQaResponseDto(int board_id, String member_id, String writer, Boolean isActive, String title,
                              String content, int count, int like, ZonedDateTime created_date, ZonedDateTime updated_date) {
        this.board_id = board_id;
        this.member_id = member_id;
        this.writer = writer;
        this.isActive = isActive;
        this.title = title;
        this.content = content;
        this.count = count;
        this.like = like;
        this.created_date = created_date;
        this.updated_date = updated_date;
    }
}
