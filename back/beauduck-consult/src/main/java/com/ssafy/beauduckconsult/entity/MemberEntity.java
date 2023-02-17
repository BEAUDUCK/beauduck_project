package com.ssafy.beauduckconsult.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor
public class MemberEntity {

    @Id
//    @GenericGenerator(name="uuid2", strategy = "uuid2")
//    @GeneratedValue(strategy = GenerationType.IDENTITY, generator = "uuid2")
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "provider", nullable = false)
    private String provider;

    @Builder
    public MemberEntity(String id, String provider) {
        this.id = id;
        this.provider = provider;
    }
}
