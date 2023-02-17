package com.ssafy.beauduckconsult.errorhandling.resolver;

import com.ssafy.beauduckconsult.dto.common.response.ResponseErrorDto;
import com.ssafy.beauduckconsult.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.beauduckconsult.errorhandling.exception.service.RequestErrorException;
import com.ssafy.beauduckconsult.util.ResponseUtil;
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
    @ExceptionHandler(value = EntityIsNullException.class)
    public ResponseErrorDto<?> handle(EntityIsNullException e, HttpServletRequest request) {
        return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage(), request.getRequestURI());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = RequestErrorException.class)
    public ResponseErrorDto<?> handle(RequestErrorException e, HttpServletRequest request){
        return responseUtil.buildErrorResponse(HttpStatus.BAD_REQUEST, e.getMessage(), request.getRequestURI());
    }

}
