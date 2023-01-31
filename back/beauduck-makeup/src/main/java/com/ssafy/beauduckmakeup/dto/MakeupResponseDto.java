package com.ssafy.beauduckmakeup.dto;

import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Data
@NoArgsConstructor
@ApiModel(value = "MakeupResponsetDto", description = "메이크업 응답 정보")
public class MakeupResponseDto {

    private int id;
    //        @ManyToOne(fetch = FetchType.LAZY)
//        @JoinColumn(name = "id")
    private String memberId;
    private String title;
    private String content;
    private String img;
    private int duration;
    private float score;
    private int count;

    public MakeupEntity toEntity() {
        return MakeupEntity.builder()
                .id(id)
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
    public MakeupResponseDto(int id, String memberId, String title, String content, String img, int duration, float score, int count) {
        this.id = id;
        this.memberId = memberId;
        this.title = title;
        this.content = content;
        this.img = img;
        this.duration = duration;
        this.score = score;
        this.count = count;
    }
}
