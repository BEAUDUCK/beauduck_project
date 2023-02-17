package com.ssafy.beauduckmakeup.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "member_gallery")
@Getter
@NoArgsConstructor
public class MemberGalleryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "img")
    private String img;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @Column(name = "created_date")
    private ZonedDateTime createDate;

    public void updateActive(Boolean isActive){
        this.isActive = isActive;
    }

    @Builder
    public MemberGalleryEntity(int id, MemberEntity memberEntity, Boolean isActive, String img, ZonedDateTime createDate) {
        this.id = id;
        this.memberEntity = memberEntity;
        this.isActive = isActive;
        this.img = img;
        this.createDate = createDate;
    }
}
