package com.ssafy.beauduckauth.entity.member;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckauth.dto.member.UpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "member_profile")
@Getter
@NoArgsConstructor
public class MemberProfileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;

    @Column(name = "nickname")
    private String nickName;

    @Column(name = "img")
    private String img;

    @Column(name = "content")
    private String content;

    @Column(name = "exp")
    private int exp;

    @Column(name = "badge")
    private String badge;

    @Column(name = "is_private")
    private Boolean isPrivate;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @Column(name = "created_date")
    private ZonedDateTime createDate;

    @UpdateTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @Column(name = "updated_date")
    private ZonedDateTime updateDate;

    @Builder
    public MemberProfileEntity(MemberEntity memberEntity, String nickName, String img, String content,
                               int exp, String badge, Boolean isPrivate){
        this.memberEntity = memberEntity;
        this.nickName = nickName;
        this.img = img;
        this.content = content;
        this.exp = exp;
        this.badge = badge;
        this.isPrivate = isPrivate;
    }

    public void updateMemberProfile(UpdateRequestDto updateRequestDto){
        this.nickName = updateRequestDto.getNickName();
        this.content = updateRequestDto.getContent();
    }
}
