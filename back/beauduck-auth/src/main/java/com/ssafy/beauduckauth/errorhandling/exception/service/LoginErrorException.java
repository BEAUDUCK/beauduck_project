package com.ssafy.beauduckauth.errorhandling.exception.service;

import com.ssafy.beauduckauth.errorhandling.exception.DefaultException;

public class LoginErrorException extends DefaultException {
    public LoginErrorException(String message) {
        super(message);
    }
}
