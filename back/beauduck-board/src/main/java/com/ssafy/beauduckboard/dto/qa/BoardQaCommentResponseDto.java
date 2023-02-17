package com.ssafy.beauduckboard.dto.qa;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckboard.entity.MemberEntity;
import com.ssafy.beauduckboard.entity.qa.BoardQaEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@ApiModel(value = "CommentQaResponseDto : 질문 게시판 댓글 응답 정보", description = "질문 게시판 댓글 응답 정보를 나타낸다.")
public class BoardQaCommentResponseDto {

    @ApiParam(value = "댓글 id", required = true)
    private int id;
    @ApiParam(value = "멤버", required = true)
    @JsonIgnore
    private MemberEntity memberEntity;
    @ApiParam(value = "댓글 작성자", required = true)
    private String writer;

    @ApiParam(value = "댓글 해당 게시글 id", required = true)
    @JsonIgnore
    private BoardQaEntity boardQaEntity;

    @ApiParam(value = "댓글 삭제 여부", required = true)
    private Boolean isActive;
    @ApiParam(value = "댓글 내용", required = true)
    private String content;
    @ApiParam(value = "댓글 좋아요", required = true)
    private int likes;
    @ApiParam(value = "생성 시간", required = true)
    private ZonedDateTime created_date;
    @ApiParam(value = "업데이트 시간", required = true)
    private  ZonedDateTime updated_date;
    @ApiParam(value = "댓글 멤머 id", required = true)
    private  String  memberId;

    @Builder
    public BoardQaCommentResponseDto(int id, MemberEntity memberEntity, String writer, BoardQaEntity boardQaEntity,
                                     Boolean isActive, String content, int likes,
                                     ZonedDateTime created_date, ZonedDateTime updated_date, String  memberId) {
        this.id = id;
        this.memberEntity = memberEntity;
        this.writer = writer;
        this.boardQaEntity = boardQaEntity;
        this.isActive = isActive;
        this.content = content;
        this.likes = likes;
        this.created_date = created_date;
        this.updated_date = updated_date;
        this.memberId = memberId;
    }


}
