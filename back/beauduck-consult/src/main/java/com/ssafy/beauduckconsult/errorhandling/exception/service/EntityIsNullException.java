package com.ssafy.beauduckconsult.errorhandling.exception.service;

import com.ssafy.beauduckconsult.errorhandling.exception.DefaultException;

public class EntityIsNullException extends DefaultException {
    public EntityIsNullException(String message) {
        super(message);
    }
}
