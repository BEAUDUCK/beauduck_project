package com.ssafy.beauduckboard.dto.info;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckboard.entity.MemberEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@ApiModel(value = "BoardInfoResponseDto", description = "정보 게시판 정보")
public class BoardInfoResponseDto {
    @ApiParam(value = "게시판 id", required = true)
    private int id;
    @ApiParam(value = "정보 게시판 member_id", required = true)
    @JsonIgnore
    private MemberEntity memberEntity;
    @ApiParam(value = "게시판 제목", required = true)
    private String title;
    @ApiParam(value = "게시판 글쓴이", required = true)
    private String writer;
    @ApiParam(value = "정보 게시판 삭제여부", required = true)
    private Boolean isActive;
    @ApiParam(value = "게시판 글", required = true)
    private String content;
    @ApiParam(value = "게시판 조회수", required = true)
    private int count;
    @ApiParam(value = "게시판 좋아요수", required = true)
    private int likes;
    @ApiParam(value = "생성 시간", required = true)
    private ZonedDateTime createdDate;
    @ApiParam(value = "업데이트 시간", required = true)
    private  ZonedDateTime updatedDate;
    @ApiParam(value = "질문 게시판 멤버 아이디", required = true)
    private String memberId;

    @Builder
    public BoardInfoResponseDto(int id, MemberEntity memberEntity, String title,
                            String writer, boolean isActive, String content, int count, int likes,
                            ZonedDateTime createdDate, ZonedDateTime updatedDate, String memberId) {
        this.id = id;
        this.memberEntity = memberEntity;
        this.title = title;
        this.writer = writer;
        this.isActive = isActive;
        this.content = content;
        this.count = count;
        this.likes = likes;
        this.createdDate = createdDate;
        this.updatedDate = updatedDate;
        this.memberId = memberId;
    }

//    public BoardInfoEntity ToEntity(){
//        return BoardInfoEntity.builder()
//                .memberId(memberId)
//                .title(title)
//                .content(content)
//                .writer(writer)
//                .isActive(isActive)
//                .build();
//    }
}
