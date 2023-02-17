package com.ssafy.beauduckboard.dto.qa;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckboard.entity.MemberEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.lang.reflect.Member;
import java.time.ZonedDateTime;

@Getter
@NoArgsConstructor
@ApiModel(value = "BoardQaResponseDto : 질문 게시판 응답 정보", description = "질문 게시판 응답 정보를 나타낸다.")
public class BoardQaResponseDto {

    @ApiParam(value = "질문 게시판 id", required = true)
    private int id;
    @ApiParam(value = "질문 게시판 member_id", required = true)
    @JsonIgnore
    private MemberEntity memberEntity;
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
    private int likes;
    @ApiParam(value = "질문 게시판 멤버 아이디", required = true)
    private String memberId;
    @ApiParam(value = "생성 시간", required = true)
    private ZonedDateTime created_date;
    @ApiParam(value = "업데이트 시간", required = true)
    private ZonedDateTime updated_date;

    @Builder
    public BoardQaResponseDto(int id, MemberEntity memberEntity, String writer, Boolean isActive, String title,
                              String content, int count, int likes, ZonedDateTime created_date, ZonedDateTime updated_date, String memberId) {
        this.id = id;
        this.memberEntity = memberEntity;
        this.writer = writer;
        this.isActive = isActive;
        this.title = title;
        this.content = content;
        this.count = count;
        this.likes = likes;
        this.memberId = memberId;
        this.created_date = created_date;
        this.updated_date = updated_date;
    }


}
