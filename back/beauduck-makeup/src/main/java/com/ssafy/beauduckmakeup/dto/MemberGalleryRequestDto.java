package com.ssafy.beauduckmakeup.dto;

import com.ssafy.beauduckmakeup.entity.MemberEntity;
import com.ssafy.beauduckmakeup.entity.MemberGalleryEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Builder
public class MemberGalleryRequestDto {
    private int id;
    private MemberEntity memberEntity;
    private Boolean isActive;
    private String img;

    public MemberGalleryEntity toEntity() {
        return MemberGalleryEntity.builder()
                .id(id)
                .memberEntity(memberEntity)
                .isActive(isActive)
                .img(img)
                .build();
    }

    @Builder
    public MemberGalleryRequestDto(int id, MemberEntity memberEntity, Boolean isActive, String img) {
        this.id = id;
        this.memberEntity = memberEntity;
        this.isActive = isActive;
        this.img = img;
    }
}

