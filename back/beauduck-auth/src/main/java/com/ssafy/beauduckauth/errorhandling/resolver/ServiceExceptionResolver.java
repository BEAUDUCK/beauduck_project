package com.ssafy.beauduckauth.errorhandling.resolver;

import com.ssafy.beauduckauth.dto.common.response.ResponseErrorDto;
import com.ssafy.beauduckauth.errorhandling.exception.service.DuplicateErrorException;
import com.ssafy.beauduckauth.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.beauduckauth.errorhandling.exception.service.LoginErrorException;
import com.ssafy.beauduckauth.errorhandling.exception.service.SignupErrorException;
import com.ssafy.beauduckauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ServiceExceptionResolver {

    private final ResponseUtil responseUtil;

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = LoginErrorException.class)
    public ResponseErrorDto<?> handle(LoginErrorException e, HttpServletRequest request) {
        return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage(), request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = SignupErrorException.class)
    public ResponseErrorDto<?> handle(SignupErrorException e, HttpServletRequest request) {
        return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage(), request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = DuplicateErrorException.class)
    public ResponseErrorDto<?> handle(DuplicateErrorException e, HttpServletRequest request) {
        return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage(), request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = EntityIsNullException.class)
    public ResponseErrorDto<?> handle(EntityIsNullException e, HttpServletRequest request) {
        return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage(), request.getRequestURI());
    }

}
