package com.ssafy.beauduckmakeup.dto;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@ApiModel(value = "MakeupRequestDto", description = "메이크업 요청 정보")
public class MakeupRequestDto {
    @ApiParam(value = "메이크업 member_id", required = true)
    private String memberId;
    @ApiParam(value = "메이크업 제목", required = true)
    private String title;
    @ApiParam(value = "메이크업 상세설명", required = true)
    private String content;
    @ApiParam(value = "메이크업 썸네일 파일", required = true)
    private String img;
    @ApiParam(value = "메이크업 소요시간", required = true)
    private int duration;
    @ApiParam(value = "메이크업 평가", required = true)
    private float score;
    @ApiParam(value = "메이크업 조회수", required = true)
    private int count;
    @ApiParam(value = "메이크업 대분류 리스트", required = true)
    private List<MakeupMainRequestDto> makeupMainList = new ArrayList<>();

    public MakeupEntity toEntity() {
        return MakeupEntity.builder()
                .memberId(memberId)
                .title(title)
                .content(content)
                .img(img)
                .duration(duration)
                .score(score)
                .count(count)
                .build();
    }

    @Builder
    public MakeupRequestDto(String memberId, String title, String content, String img, int duration, float score, int count, List<MakeupMainRequestDto> makeupMainList) {
        this.memberId = memberId;
        this.title = title;
        this.content = content;
        this.img = img;
        this.duration = duration;
        this.score = score;
        this.count = count;
        this.makeupMainList = makeupMainList;
    }
}
