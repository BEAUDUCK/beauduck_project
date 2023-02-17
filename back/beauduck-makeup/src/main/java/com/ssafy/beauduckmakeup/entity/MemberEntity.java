package com.ssafy.beauduckmakeup.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor
public class MemberEntity {

    @Id
    @Column(name = "id", nullable = false)
    private String id;

    private String provider;

    @Builder
    public MemberEntity(String id, String provider) {
        this.id = id;
        this.provider = provider;
    }
}



