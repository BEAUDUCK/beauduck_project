package com.ssafy.beauduckauth.errorhandling.exception.service;

import com.ssafy.beauduckauth.errorhandling.exception.DefaultException;

public class DuplicateErrorException extends DefaultException {
    public DuplicateErrorException(String message) {
        super(message);
    }
}
