package com.ssafy.beauduckmakeup.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "makeup_middle")
public class MakeupMiddleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "main_id",foreignKey = @ForeignKey(value = ConstraintMode.NO_CONSTRAINT),updatable=false)
    @JsonBackReference
    private MakeupMainEntity mainId;
    private String step;
    private String img;
    @Column(name = "color_code")
    private String colorCode;
    private String content;

    @Builder
    public MakeupMiddleEntity(int id, MakeupMainEntity mainId, String step, String img, String colorCode, String content) {
        this.id = id;
        this.mainId = mainId;
        this.step = step;
        this.img = img;
        this.colorCode = colorCode;
        this.content = content;
    }
}
