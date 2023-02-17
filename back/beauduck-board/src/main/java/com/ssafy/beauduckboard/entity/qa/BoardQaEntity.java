package com.ssafy.beauduckboard.entity.qa;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckboard.entity.MemberEntity;
import com.ssafy.beauduckboard.entity.TimeEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "board_qa")
public class BoardQaEntity extends TimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY) // xtoOne으로 끝나면 fetch를 해준다.
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;

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
    public BoardQaEntity(int id, MemberEntity memberEntity, String writer, Boolean isActive,
                         String title, String content, int count, int likes, List<BoardQaCommentEntity> commentList,
                         List<GalleryQaEntity> galleryList) {
        this.id = id;
        this.memberEntity = memberEntity;
        this.writer = writer;
        this.isActive = isActive;
        this.title = title;
        this.content = content;
        this.count = count;
        this.likes = likes;
        this.commentList = commentList;
        this.galleryList = galleryList;
    }


    public boolean updateBoard(String title, String content){
        if (title == null) return false;
        if (content == null) return false;
        this.title = title;
        this.content = content;
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
