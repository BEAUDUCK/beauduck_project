package com.ssafy.beauduckmakeup.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "makeup_id",foreignKey = @ForeignKey(value = ConstraintMode.NO_CONSTRAINT),updatable=false)
    @JsonBackReference
    private MakeupEntity makeupId;
    private String step;
    @OneToMany(mappedBy = "mainId", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<MakeupMiddleEntity> makeupMiddleList = new ArrayList<>();

    @Builder
    public MakeupMainEntity(int id, MakeupEntity makeupId, String step) {
        this.id = id;
        this.makeupId = makeupId;
        this.step = step;
    }
}
