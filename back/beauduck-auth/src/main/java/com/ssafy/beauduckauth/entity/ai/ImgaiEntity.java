package com.ssafy.beauduckauth.entity.ai;

import com.ssafy.beauduckauth.entity.member.MemberEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "imgai")
public class ImgaiEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JoinColumn(name = "member_id")
    @OneToOne(fetch = FetchType.LAZY)
    private MemberEntity memberEntity;

    @Column(name = "img")
    private String img;

    @Column(name = "is_makeup")
    private Boolean isMakeup;

    @Builder
    public ImgaiEntity(MemberEntity memberEntity, String img, Boolean isMakeup) {
        this.memberEntity = memberEntity;
        this.img = img;
        this.isMakeup = isMakeup;
    }

}