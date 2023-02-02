package com.ssafy.beauduckboard.entity.qa;


import com.ssafy.beauduckboard.entity.MemberEntity;
import com.ssafy.beauduckboard.entity.TimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "qa_comment")
public class BoardQaCommentEntity extends TimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY) // xtoOne으로 끝나면 fetch를 해준다.
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;

    private String writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardQaEntity boardQaEntity;
    @Column(name = "is_active")
    private Boolean isActive;
    private String content;
    private int likes;

    @Builder
    public BoardQaCommentEntity(int id, MemberEntity memberEntity, String writer, BoardQaEntity boardQaEntity, Boolean isActive, String content, int likes) {
        this.id = id;
        this.memberEntity = memberEntity;
        this.writer = writer;
        this.boardQaEntity = boardQaEntity;
        this.isActive = isActive;
        this.content = content;
        this.likes = likes;
    }

    public boolean updateComment(String content){
        if (content == null) return false;
        this.content = content;
        return true;
    }

    public boolean deleteComment(){
        this.isActive = false;
        return true;
    }

}
