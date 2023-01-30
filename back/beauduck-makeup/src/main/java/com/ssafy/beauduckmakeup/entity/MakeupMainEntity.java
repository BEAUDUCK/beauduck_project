package com.ssafy.beauduckmakeup.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "makeup_main")
public class MakeupMainEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "makeup_id")
    private MakeupEntity makeupId;
    private String step;
    @JsonIgnore
    @OneToMany(mappedBy = "mainId")
    private List<MakeupMiddleEntity> makeupMiddleEntityList = new ArrayList<>();

    @Builder
    public MakeupMainEntity(int id, MakeupEntity makeupId, String step) {
        this.id = id;
        this.makeupId = makeupId;
        this.step = step;
    }
}
