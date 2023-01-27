package com.ssafy.beauduckboard.entity;

import lombok.*;

import javax.persistence.*;
import java.lang.reflect.Member;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "board_qa")
public class BoardQaEntity extends TimeEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int boardId;
    @Column(name = "member_id")
    private String memberId;
    private String writer;
    @Column(name = "is_active")
    private Boolean isActive;
    private String title;
    private String content;
    private int count;
    private int like;

    @Builder
    public BoardQaEntity(int boardId, String memberId, String writer, Boolean isActive, String title, String content, int count, int like) {
        this.boardId = boardId;
        this.memberId = memberId;
        this.writer = writer;
        this.isActive = isActive;
        this.title = title;
        this.content = content;
        this.count = count;
        this.like = like;
    }

    public boolean updateBoard(String title, String content){
        if (title == null) return false;
        if (content == null) return false;
        this.title = title;
        this.content = content;
        return true;
    }


}
