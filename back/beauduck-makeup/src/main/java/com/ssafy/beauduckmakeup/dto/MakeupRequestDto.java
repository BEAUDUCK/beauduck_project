package com.ssafy.beauduckmakeup.dto;

import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Data
@NoArgsConstructor
@ApiModel(value = "MakeupRequestDto", description = "메이크업 요청 정보")
public class MakeupRequestDto {

    private String memberId;
    private String title;
    private String content;
    private String img;
    private int duration;
    private float score;
    private int count;
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
