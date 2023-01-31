package com.ssafy.beauduckboard.entity.qa;

import com.ssafy.beauduckboard.entity.TimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "qa_gallery")
public class GalleryQaEntity extends TimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int GalleryQaId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "boardId")
    private BoardQaEntity boardQaEntity;
    private String img;


    @Builder
    public GalleryQaEntity(int galleryQaId, BoardQaEntity boardQaEntity, String img) {
        this.GalleryQaId = galleryQaId;
        this.boardQaEntity = boardQaEntity;
        this.img = img;
    }
}
