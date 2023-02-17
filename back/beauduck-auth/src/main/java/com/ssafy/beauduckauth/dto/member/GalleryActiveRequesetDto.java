package com.ssafy.beauduckauth.dto.member;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class GalleryActiveRequesetDto {
    private String memberId;
    private Boolean isActive;

    GalleryActiveRequesetDto(String memberId, Boolean isActive){
        this.memberId = memberId;
        this.isActive = isActive;
    }
}
