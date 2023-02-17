package com.ssafy.beauduckauth.errorhandling.exception.service;

import com.ssafy.beauduckauth.errorhandling.exception.DefaultException;

public class SignupErrorException extends DefaultException {
    public SignupErrorException(String message) {
        super(message);
    }
}
