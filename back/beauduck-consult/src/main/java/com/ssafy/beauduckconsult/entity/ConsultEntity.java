package com.ssafy.beauduckconsult.entity;


import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "together_standby")
public class ConsultEntity extends TimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "is_active")
    private Boolean isActive;
    private String title;
    private String content;
    private String host;

    @Builder
    public ConsultEntity(int id, Boolean isActive, String title, String content, String host) {
        this.id = id;
        this.isActive = isActive;
        this.title = title;
        this.content = content;
        this.host = host;
    }

    public boolean delete(){
        this.isActive = false;
        return true;
    }

}
