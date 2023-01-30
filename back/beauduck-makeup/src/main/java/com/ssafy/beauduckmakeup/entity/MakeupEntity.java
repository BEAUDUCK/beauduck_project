package com.ssafy.beauduckmakeup.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "makeup")

public class MakeupEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    //        @ManyToOne(fetch = FetchType.LAZY)
//        @JoinColumn(name = "id")
    @Column(name = "member_id")
    private String memberId;
    private String title;
    private String content;
    private String img;
    private int duration;
    private float score;
    private int count;
    @JsonIgnore
    @OneToMany(mappedBy = "makeupId")
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

}
