package com.ssafy.beauduckboard.dto.qa;

import com.ssafy.beauduckboard.entity.MemberEntity;
import com.ssafy.beauduckboard.entity.qa.BoardQaEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@ApiModel(value = "BoardQaRequestDto : 질문 게시판 요청 정보", description = "질문 게시판 요청 정보를 나타낸다.")
public class BoardQaRequestDto {

    @ApiParam(value = "질문 게시판 member_id", required = true)
    private MemberEntity memberEntity;
    @ApiParam(value = "질문 게시판 제목", required = true)
    private String title;
    @ApiParam(value = "질문 게시판 작성자", required = true)
    private String writer;
    @ApiParam(value = "질문 게시판 내용", required = true)
    private String content;
    @ApiParam(value = "질문 게시판 삭제 여부", required = true)
    private Boolean isActive;


//    @ApiParam(value = "질문 게시판 삭제 여부", required = true)
//    private Boolean like;
//    @ApiParam(value = "질문 게시판 삭제 여부", required = true)
//    private Boolean count;

    @Builder
    public BoardQaRequestDto(MemberEntity memberEntity, String title, String writer, String content, Boolean isActive) {
        this.memberEntity = memberEntity;
        this.title = title;
        this.writer = writer;
        this.content = content;
        this.isActive = isActive;
    }

    @Builder
    public BoardQaEntity ToEntity() {
        return BoardQaEntity.builder()
                .memberEntity(memberEntity)
                .title(title)
                .writer(writer)
                .content(content)
                .isActive(isActive)
                .build();
    }

}
