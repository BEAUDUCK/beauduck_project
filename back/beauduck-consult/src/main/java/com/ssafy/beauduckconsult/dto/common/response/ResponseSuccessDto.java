package com.ssafy.beauduckconsult.dto.common.response;

import lombok.Builder;

import java.time.ZonedDateTime;

public class ResponseSuccessDto<T> extends ResponseCommonDto{
    private T data;

    @Builder
    public ResponseSuccessDto(ZonedDateTime timeStamp, int code, String status, T data){
        super(timeStamp, code, status);
        this.data = data;
    }
}
