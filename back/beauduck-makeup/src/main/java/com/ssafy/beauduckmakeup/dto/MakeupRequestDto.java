package com.ssafy.beauduckmakeup.dto;

import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiParam;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@ApiModel(value = "MakeupRequestDto", description = "메이크업 요청 정보")
public class MakeupRequestDto {
    private int id;
    private String memberId;
    private String title;
    private String content;
    private String img;
    private int duration;
    private float score;
    private int count;
    private List<MakeupMainRequestDto> makeupMainList = new ArrayList<>();

    @Builder
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
}
