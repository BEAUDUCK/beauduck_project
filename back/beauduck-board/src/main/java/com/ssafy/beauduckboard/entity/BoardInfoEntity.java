package com.ssafy.beauduckboard.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
        private String isActive;
        private String title;
        private String content;
        private int count;
        private int like;

        @Builder
        public BoardInfoEntity(int id, String memberId, String writer, String isActive, String title, String content, int count, int like) {
                this.id = id;
                this.memberId = memberId;
                this.writer = writer;
                this.isActive = isActive;
                this.title = title;
                this.content = content;
                this.count = count;
                this.like = like;
        }

        public void update(int id, String memberId, String writer, String title, String content, int count, int like) {
                this.id = id;
                this.memberId = memberId;
                this.writer = writer;
                this.title = title;
                this.content = content;
                this.count = count;
                this.like = like;
        }

    }