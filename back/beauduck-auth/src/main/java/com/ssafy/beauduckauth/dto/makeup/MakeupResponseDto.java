package com.ssafy.beauduckauth.dto.makeup;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MakeupResponseDto {
    private int id;
    private String title;
    private float score;
    private int count;
    private String img;
}
