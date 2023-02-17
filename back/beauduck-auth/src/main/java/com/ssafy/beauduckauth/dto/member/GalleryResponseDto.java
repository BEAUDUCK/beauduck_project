package com.ssafy.beauduckauth.dto.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class GalleryResponseDto {
    private String img;

    GalleryResponseDto(String img){
        this.img = img;
    }
}
