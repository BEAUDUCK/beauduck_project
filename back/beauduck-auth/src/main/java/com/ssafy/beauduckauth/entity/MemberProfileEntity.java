package com.ssafy.beauduckauth.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "member_profile")
@Getter
@NoArgsConstructor
public class MemberProfileEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
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
    private int badge;

    @Column(name = "is_private")
    private Boolean isPrivate;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @Column(name = "created_date")
    private ZonedDateTime createDate;

    @Builder
    public MemberProfileEntity(MemberEntity memberEntity){
        this.memberEntity = memberEntity;
    }
}
