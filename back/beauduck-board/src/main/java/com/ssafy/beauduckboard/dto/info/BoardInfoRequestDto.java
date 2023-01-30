package com.ssafy.beauduckboard.dto.info;

import com.ssafy.beauduckboard.entity.info.BoardInfoEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@ApiModel(value = "BoardInfoRequestDto", description = "정보 게시판 요청 정보")
public class BoardInfoRequestDto {
    @ApiParam(value = "정보 게시판 FK 멤버", required = true)
    private String memberId;
    @ApiParam(value = "정보 게시판 제목", required = true)
    private String title;
    @ApiParam(value = "정보 게시판 글쓴이", required = true)
    private String writer;
    @ApiParam(value = "정보 게시판 삭제여부", required = true)
    private boolean isActive;
    @ApiParam(value = "정보 게시판 글", required = true)
    private String content;
//    @Builder
//    public BoardInfoRequestDto(String memberId, String title, String writer, String content) {
//        this.memberId = memberId;
//        this.title = title;
//        this.writer = writer;
//        this.content = content;
//    }

    @Builder
    public BoardInfoEntity toEntity(){
        return BoardInfoEntity.builder()
                .memberId(memberId)
                .title(title)
                .isActive(isActive)
                .content(content)
                .writer(writer)
                .build();
    }
}
