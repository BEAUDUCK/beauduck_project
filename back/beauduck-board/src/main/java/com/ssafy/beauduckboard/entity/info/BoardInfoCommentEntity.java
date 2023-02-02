package com.ssafy.beauduckboard.entity.info;

import com.ssafy.beauduckboard.dto.info.BoardInfoCommentRequestDto;
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
@Table(name = "info_comment")
public class BoardInfoCommentEntity extends TimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY) // xtoOne으로 끝나면 fetch를 해준다.
    @JoinColumn(name = "member_id")
    private MemberEntity memberEntity;

    private String writer;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardInfoEntity boardInfoEntity;
    @Column(name = "is_active")
    private Boolean isActive;
    private String content;
    private int likes;

    @Builder
    public BoardInfoCommentEntity(int id, MemberEntity memberEntity, String writer, BoardInfoEntity boardInfoEntity, Boolean isActive, String content, int likes) {
        this.id = id;
        this.memberEntity = memberEntity;
        this.writer = writer;
        this.isActive = isActive;
        this.boardInfoEntity = boardInfoEntity;
        this.content = content;
        this.likes = likes;
    }

    public boolean update(String content) {
        if(content==null) return false;

        this.content = content;
        return true;
    }

    public boolean delete() {
        this.isActive = false;
        return true;
    }
}
