package com.ssafy.beauduckboard.entity.info;

import com.ssafy.beauduckboard.dto.info.BoardInfoCommentRequestDto;
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
    //        @ManyToOne(fetch = FetchType.LAZY)
//        @JoinColumn(name = "id")
    @Column(name = "member_id")
    private String memberId;
    private String writer;
    @Column(name = "board_id")
    private int boardId;
    @Column(name = "is_active")
    private boolean isActive;
    private String content;
    private int likes;

    @Builder
    public BoardInfoCommentEntity(int id, String memberId, String writer, int boardId, boolean isActive, String content, int likes) {
        this.id = id;
        this.memberId = memberId;
        this.writer = writer;
        this.isActive = isActive;
        this.boardId = boardId;
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
