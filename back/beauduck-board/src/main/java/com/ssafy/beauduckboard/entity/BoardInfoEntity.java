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
public class BoardInfoEntity{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private int board_id;
        //    @JsonIgnore => member response안 받아옴
        private String board_title;
        private String board_writer;
        private String board_content;
        private int board_count;

    }