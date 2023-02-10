package com.ssafy.beauducktogether.errorhandling.exception.service;

import com.ssafy.beauducktogether.errorhandling.exception.DefaultException;

public class RequestErrorException extends DefaultException {
    public RequestErrorException(String message) {
        super(message);
    }
}
