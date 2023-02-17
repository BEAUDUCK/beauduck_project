package com.ssafy.beauduckboard.dto.info;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckboard.entity.MemberEntity;
import com.ssafy.beauduckboard.entity.info.BoardInfoCommentEntity;
import com.ssafy.beauduckboard.entity.info.BoardInfoEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "BoardInfoCommentRequestDto", description = "정보 게시판 댓글 요청 정보")
public class BoardInfoCommentRequestDto {

    @ApiParam(value = "멤버", required = true)
    private MemberEntity memberEntity;
    @ApiParam(value = "정보 게시판 댓글 글쓴이", required = true)
    private String writer;
    @ApiParam(value = "정보 게시판 댓글 FK 게시글 id", required = true)
    private BoardInfoEntity boardInfoEntity;
    @ApiParam(value = "정보 게시판 댓글 삭제여부", required = true)
    private Boolean isActive;
    @ApiParam(value = "정보 게시판 댓글 글", required = true)
    private String content;


    public BoardInfoCommentEntity toEntity() {
        return BoardInfoCommentEntity.builder()
                .memberEntity(this.memberEntity)
                .writer(this.writer)
                .boardInfoEntity(this.boardInfoEntity)
                .isActive(this.isActive)
                .content(this.content)
                .build();
    }
}
