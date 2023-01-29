package com.ssafy.beauduckmakeup.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "makeup_main")
public class MakeupMainEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    //        @ManyToOne(fetch = FetchType.LAZY)
//        @JoinColumn(name = "id")
    @Column(name = "makeup_id")
    private int makeupId;
    private String step;

    @Builder
    public MakeupMainEntity(int id, int makeupId, String step) {
        this.id = id;
        this.makeupId = makeupId;
        this.step = step;
    }
}
