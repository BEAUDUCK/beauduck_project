package com.ssafy.beauduckboard.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.beauduckboard.entity.qa.BoardQaEntity;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "member")
public class MemberEntity {

    @Id
    @Column(name = "id")
    private String memberId;
    private String provider;

}
