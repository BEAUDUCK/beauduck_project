package com.ssafy.beauduckboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckboard.dto.info.BoardInfoRequestDto;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "board_info")
public class BoardInfoEntity extends TimeEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
//        @ManyToOne(fetch = FetchType.LAZY)
//        @JoinColumn(name = "id")
        @Column(name = "member_id")
        private String memberId;
        private String writer;
        @Column(name = "is_active")
        private boolean isActive;
        private String title;
        private String content;
        private int count;
        private int likes;

        @Builder
        public BoardInfoEntity(int id, String memberId, String writer, boolean isActive, String title, String content, int count, int like) {
                this.id = id;
                this.memberId = memberId;
                this.writer = writer;
                this.isActive = isActive;
                this.title = title;
                this.content = content;
                this.count = count;
                this.likes = like;
        }

        public int update(int id, BoardInfoRequestDto dto) {
                if(title==null || content==null) return -1;

                this.title = dto.getTitle();
                this.content = dto.getContent();
                this.writer = dto.getWriter();
                this.count = dto.getCount();
                this.likes = dto.getLikes();

                return id;
        }

    }