package com.ssafy.beauduckmakeup.dto;

import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Data
@NoArgsConstructor
@ApiModel(value = "MakeupResponsetDto", description = "메이크업 응답 정보")
public class MakeupResponseDto {

    private int id;
    private String title;
    private String content;
    private String img;
    private int duration;
    private float score;
    private int count;
    private List<MakeupMainResponseDto> makeupMainList = new ArrayList<>();

    public MakeupEntity toEntity() {
        return MakeupEntity.builder()
                .id(id)
                .title(title)
                .content(content)
                .img(img)
                .duration(duration)
                .score(score)
                .count(count)
                .build();
    }
    @Builder
    public MakeupResponseDto(int id, String title, String content, String img, int duration, float score, int count, List<MakeupMainResponseDto> makeupMainList) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.img = img;
        this.duration = duration;
        this.score = score;
        this.count = count;
        this.makeupMainList = makeupMainList;
    }
}
