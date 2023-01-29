package com.ssafy.beauduckauth.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "member_info")
@Getter @Setter
@NoArgsConstructor
public class MemberInfoEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;

    @Column(name = "name")
    private String username;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "age")
    private int age;

    @Column(name = "sex")
    private String sex;

    @Column(name = "social_code")
    private String socialCode;

    @Column(name = "external_id")
    private String externalId;

    @Column(name = "access_token")
    private String accessToken;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @Column(name = "created_date")
    private ZonedDateTime createDate;

    @Builder
    public MemberInfoEntity(MemberEntity memberEntity, String username, String phoneNumber, String email, int age, String sex, String socialCode, String accessToken, String externalId){
        this.memberEntity = memberEntity;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.age = age;
        this.sex = sex;
        this.socialCode = socialCode;
        this.accessToken = accessToken;
        this.externalId = externalId;
    }

}
