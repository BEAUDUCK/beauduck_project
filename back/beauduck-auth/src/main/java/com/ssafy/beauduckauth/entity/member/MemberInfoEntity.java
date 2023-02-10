package com.ssafy.beauduckauth.entity.member;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "member_info")
@Getter
@NoArgsConstructor
public class MemberInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;

    @Column(name = "name")
    private String name;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "age")
    private int age;

    @Column(name = "sex")
    private String sex;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @Column(name = "created_date")
    private ZonedDateTime createDate;

    @Builder
    public MemberInfoEntity(MemberEntity memberEntity, String name, String phoneNumber, String email, int age, String sex){
        this.memberEntity = memberEntity;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.age = age;
        this.sex = sex;
    }

}
