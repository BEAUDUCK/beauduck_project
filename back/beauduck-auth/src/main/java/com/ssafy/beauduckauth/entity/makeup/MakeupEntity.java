package com.ssafy.beauduckauth.entity.makeup;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckauth.entity.member.MemberEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "makeup")
@Getter
@NoArgsConstructor
public class MakeupEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;
    private String title;
    private String content;
    private String img;
    private int duration;
    private float score;
    private int count;

    @Builder
    public MakeupEntity(MemberEntity memberEntity, String title, String content, String img, int duration, float score, int count){
        this.memberEntity = memberEntity;
        this.title = title;
        this.content = content;
        this.img = img;
        this.duration = duration;
        this.score = score;
        this.count = count;
    }
}
