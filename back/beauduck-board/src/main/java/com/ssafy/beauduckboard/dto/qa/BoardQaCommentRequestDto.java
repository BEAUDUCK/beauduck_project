package com.ssafy.beauduckboard.dto.qa;

import com.ssafy.beauduckboard.entity.MemberEntity;
import com.ssafy.beauduckboard.entity.qa.BoardQaEntity;
import com.ssafy.beauduckboard.entity.qa.BoardQaCommentEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@ApiModel(value = "CommentQaRequestDto : 댓글 요청 정보", description = "질문 게시판 댓글 요청 정보를 나타낸다.")
public class BoardQaCommentRequestDto {


    @ApiParam(value = "멤버", required = true)
    private MemberEntity memberEntity;
    @ApiParam(value = "작성자", required = true)
    private String writer;
    @ApiParam(value = "FK 질문게시판", required = true)
    private BoardQaEntity boardQaEntity;
    @ApiParam(value = "삭제 여부", required = true)
    private Boolean isActive;
    @ApiParam(value = "내용", required = true)
    private String content;


    @Builder
    public BoardQaCommentRequestDto(MemberEntity memberEntity, String writer, BoardQaEntity boardQaEntity, Boolean isActive, String content) {
        this.memberEntity = memberEntity;
        this.writer = writer;
        this.boardQaEntity = boardQaEntity;
        this.isActive = isActive;
        this.content = content;
    }

    public BoardQaCommentEntity ToEntity(){
        return BoardQaCommentEntity.builder()
                .memberEntity(memberEntity)
                .writer(writer)
                .boardQaEntity(boardQaEntity)
                .isActive(isActive)
                .content(content)
                .build();
    }

}
