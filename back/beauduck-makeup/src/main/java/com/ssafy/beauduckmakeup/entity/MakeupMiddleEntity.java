package com.ssafy.beauduckmakeup.entity;

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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "main_id")
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
