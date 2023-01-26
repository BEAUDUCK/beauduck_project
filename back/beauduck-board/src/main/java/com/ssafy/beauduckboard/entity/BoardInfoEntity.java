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
public class BoardInfoEntity extends TimeEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int id;
//        @ManyToOne(fetch = FetchType.LAZY)
//        @JoinColumn(name = "id")
        private String memberId;
        private String writer;
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

    }