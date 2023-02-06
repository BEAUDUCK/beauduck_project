package com.ssafy.beauduckauth.errorhandling.resolver;

import com.ssafy.beauduckauth.dto.common.response.ResponseErrorDto;
import com.ssafy.beauduckauth.errorhandling.exception.service.LoginErrorException;
import com.ssafy.beauduckauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class ServiceExceptionResolver {

    private final ResponseUtil responseUtil;

//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(value = LoginErrorException.class)
//    public ResponseErrorDto<?> handle(MethodArgumentNotValidException e, HttpServletRequest request){
//
//    }
}
