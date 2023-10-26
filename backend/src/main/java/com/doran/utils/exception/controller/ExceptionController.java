package com.doran.utils.exception.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.doran.utils.exception.dto.CustomException;
import com.doran.utils.exception.dto.ErrorResponseEntity;

@RestControllerAdvice
@Slf4j
public class ExceptionController {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponseEntity> ExceptionHandler(CustomException e) {
        log.error("예외 발생 : {}", e.getMessage());
        log.error("예외 내용 : ", e);
        return ErrorResponseEntity.toResponseEntity(e.getErrorCode());
    }

    //모든 예외를 처리할 메소드
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> exceptionHandler(Exception e) {
        e.printStackTrace();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("에러");
    }

    //404 (NoHandlerFoundException)
    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    public ResponseEntity<?> noHandlerFoundExceptionHandler(Exception e, Model model) {
        e.printStackTrace();
        return ResponseEntity.status(404).body(e.getMessage());
    }

}
