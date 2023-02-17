package com.ssafy.beauduckmakeup.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity
@Table(name = "recent_makeup")
@Getter
@NoArgsConstructor
public class RecentMakeupEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "makeup_id")
    private MakeupEntity makeupEntity;

    @CreationTimestamp
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    @Column(name = "created_date")
    private ZonedDateTime createDate;

    @Builder
    public RecentMakeupEntity(int id, MemberEntity memberEntity, MakeupEntity makeupEntity, ZonedDateTime createDate) {
        this.id = id;
        this.memberEntity = memberEntity;
        this.makeupEntity = makeupEntity;
        this.createDate = createDate;
    }
}
