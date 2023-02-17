package com.ssafy.beauducktogether.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class UserListInfoDto implements Serializable {

    private String roomId; // 방번호
    private List<String> userList;

}
