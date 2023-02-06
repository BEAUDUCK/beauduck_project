package com.ssafy.beauduckmakeup.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.beauduckmakeup.dto.MakeupResponseDto;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "makeup")
public class MakeupEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "member_id")
    private String memberId;
    private String title;
    private String content;
    private String img;
    private int duration;
    private float score;
    private int count;
    @JsonManagedReference
    @OneToMany(mappedBy = "makeupId", cascade = CascadeType.ALL)
    private List<MakeupMainEntity> makeupMainList = new ArrayList<>();

    @Builder
    public MakeupEntity(int id, String memberId, String title, String content, String img, int duration, float score, int count) {
        this.id = id;
        this.memberId = memberId;
        this.title = title;
        this.content = content;
        this.img = img;
        this.duration = duration;
        this.score = score;
        this.count = count;
    }

    public boolean updateScore(float score, int count) {
        this.score = score;
        this.count = count;
        return true;
    }

    public boolean updateImg(String url) {
        this.img = url;
        return true;
    }

//    public boolean updateCount(int count) {
//        this.count += 1;
//        return true;
//    }

}
