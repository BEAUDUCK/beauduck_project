package com.ssafy.beauduckboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckboard.dto.qa.BoardQaRequestDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "board_qa")
public class BoardQaEntity extends TimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "member_id")
    private String memberId;
    private String writer;
    @Column(name = "is_active")
    private Boolean isActive;
    private String title;
    private String content;
    private int count;
    private int likes;

    @JsonIgnore
    @OneToMany(mappedBy = "boardQaEntity")
    private List<BoardQaCommentEntity> commentList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "boardQaEntity")
    private List<GalleryQaEntity> galleryList = new ArrayList<>();

    @Builder
    public BoardQaEntity(int id, String memberId, String writer, Boolean isActive,
                         String title, String content, int count, int likes, List<BoardQaCommentEntity> commentList,
                         List<GalleryQaEntity> galleryList) {
        this.id = id;
        this.memberId = memberId;
        this.writer = writer;
        this.isActive = isActive;
        this.title = title;
        this.content = content;
        this.count = count;
        this.likes = likes;
        this.commentList = commentList;
        this.galleryList = galleryList;
    }


    public boolean updateBoard(BoardQaRequestDto boardQaRequestDto){
        if (title == null) return false;
        if (content == null) return false;
        this.title = boardQaRequestDto.getTitle();
        this.content = boardQaRequestDto.getContent();
        return true;
    }

    public boolean deleteBoard(){
        this.isActive = false;
        return true;
    }

    public boolean updateCount(int count){
        this.count = count;
        return true;
    }


}
