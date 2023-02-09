package com.ssafy.beauduckconsult.errorhandling.exception.service;

import com.ssafy.beauduckconsult.errorhandling.exception.DefaultException;

public class RequestErrorException extends DefaultException {
    public RequestErrorException(String message) {
        super(message);
    }
}
