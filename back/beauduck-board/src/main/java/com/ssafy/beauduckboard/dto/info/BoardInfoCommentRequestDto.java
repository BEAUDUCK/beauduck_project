package com.ssafy.beauduckboard.dto.info;

import com.ssafy.beauduckboard.entity.info.BoardInfoCommentEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "BoardInfoCommentRequestDto", description = "정보 게시판 댓글 요청 정보")
public class BoardInfoCommentRequestDto {
    @ApiParam(value = "정보 게시판 댓글 FK 멤버", required = true)
    private String memberId;
    @ApiParam(value = "정보 게시판 댓글 글쓴이", required = true)
    private String writer;
    @ApiParam(value = "정보 게시판 댓글 FK 게시글 id", required = true)
    private int boardId;
    @ApiParam(value = "정보 게시판 댓글 삭제여부", required = true)
    private boolean isActive;
    @ApiParam(value = "정보 게시판 댓글 글", required = true)
    private String content;


    public BoardInfoCommentEntity toEntity() {
        return BoardInfoCommentEntity.builder()
                .memberId(this.memberId)
                .writer(this.writer)
                .boardId(this.boardId)
                .isActive(this.isActive)
                .content(this.content)
                .build();
    }
}
