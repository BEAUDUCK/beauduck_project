package com.ssafy.beauduckauth.errorhandling.exception.service;

import com.ssafy.beauduckauth.errorhandling.exception.DefaultException;

public class EntityIsNullException extends DefaultException {
    public EntityIsNullException(String message) {
        super(message);
    }
}
