package com.ssafy.beauducktogether.errorhandling.exception.service;

import com.ssafy.beauducktogether.errorhandling.exception.DefaultException;

public class EntityIsNullException extends DefaultException {
    public EntityIsNullException(String message) {
        super(message);
    }
}
