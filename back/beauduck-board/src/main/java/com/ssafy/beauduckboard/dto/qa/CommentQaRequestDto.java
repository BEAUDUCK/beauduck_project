package com.ssafy.beauduckboard.dto.qa;

import com.ssafy.beauduckboard.entity.BoardQaEntity;
import com.ssafy.beauduckboard.entity.BoardQaCommentEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@ApiModel(value = "CommentQaRequestDto : 댓글 요청 정보", description = "질문 게시판 댓글 요청 정보를 나타낸다.")
public class CommentQaRequestDto {


    @ApiParam(value = "멤버", required = true)
    private String memberId;
    @ApiParam(value = "작성자", required = true)
    private String writer;
    @ApiParam(value = "FK 질문게시판", required = true)
    private BoardQaEntity boardQaEntity;
    @ApiParam(value = "삭제 여부", required = true)
    private Boolean isActive;
    @ApiParam(value = "내용", required = true)
    private String content;


    @Builder
    public CommentQaRequestDto(String memberId, String writer, BoardQaEntity boardQaEntity, Boolean isActive, String content) {
        this.memberId = memberId;
        this.writer = writer;
        this.boardQaEntity = boardQaEntity;
        this.isActive = isActive;
        this.content = content;
    }

    public BoardQaCommentEntity ToEntity(){
        return BoardQaCommentEntity.builder()
                .memberId(memberId)
                .writer(writer)
                .boardQaEntity(boardQaEntity)
                .isActive(isActive)
                .content(content)
                .build();
    }

}
