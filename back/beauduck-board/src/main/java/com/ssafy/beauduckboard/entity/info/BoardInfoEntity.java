package com.ssafy.beauduckboard.entity.info;

import com.ssafy.beauduckboard.dto.info.BoardInfoRequestDto;
import com.ssafy.beauduckboard.entity.MemberEntity;
import com.ssafy.beauduckboard.entity.TimeEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "board_info")
public class BoardInfoEntity extends TimeEntity {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
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

        @Builder
        public BoardInfoEntity(int id, MemberEntity memberEntity, String writer, Boolean isActive, String title, String content, int count, int like) {
                this.id = id;
                this.memberEntity = memberEntity;
                this.writer = writer;
                this.isActive = isActive;
                this.title = title;
                this.content = content;
                this.count = count;
                this.likes = like;
        }

        public boolean update(String title, String content) {
                if(title==null || content==null) return false;

                this.title = title;
                this.content = content;

                return true;
        }

        public boolean delete() {
                this.isActive = false;
                return true;
        }

        public boolean updateCount(int count) {
                this.count = count;
                return true;
        }


    }