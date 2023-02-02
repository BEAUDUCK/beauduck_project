package com.ssafy.beauduckboard.dto.info;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckboard.entity.MemberEntity;
import com.ssafy.beauduckboard.entity.info.BoardInfoEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@ApiModel(value = "BoardInfoCommentResponseDto", description = "정보 게시판 댓글 정보")
public class BoardInfoCommentResponseDto {
    @ApiParam(value = "정보 게시판 댓글 id", required = true)
    private int id;
    @ApiParam(value = "멤버", required = true)
    @JsonIgnore
    private MemberEntity memberEntity;
    @ApiParam(value = "정보 게시판 댓글 글쓴이", required = true)
    private String writer;
    @ApiParam(value = "정보 게시판 댓글 FK 게시글 id", required = true)
    @JsonIgnore
    private BoardInfoEntity boardInfoEntity;
    @ApiParam(value = "정보 게시판 댓글 삭제여부", required = true)
    private Boolean isActive;
    @ApiParam(value = "정보 게시판 댓글 글", required = true)
    private String content;
    @ApiParam(value = "정보 게시판 댓글 좋아요수", required = true)
    private int likes;
    @ApiParam(value = "생성 시간", required = true)
    private ZonedDateTime createdDate;
    @ApiParam(value = "업데이트 시간", required = true)
    private  ZonedDateTime updatedDate;
    @ApiParam(value = "질문 게시판 멤버 아이디", required = true)
    private String memberId;

    @Builder
    public BoardInfoCommentResponseDto(int id, MemberEntity memberEntity, String memberId,
                                String writer, BoardInfoEntity boardInfoEntity, Boolean isActive, String content, int likes,
                                ZonedDateTime createdDate, ZonedDateTime updatedDate) {
        this.id = id;
        this.memberEntity = memberEntity;
        this.memberId = memberId;
        this.writer = writer;
        this.boardInfoEntity = boardInfoEntity;
        this.isActive = isActive;
        this.content = content;
        this.likes = likes;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
    }
}
