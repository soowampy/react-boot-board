package com.malgn.board.common.aop;

import com.malgn.board.domain.common.RestResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
public class RestControllerExceptionAdvice extends RuntimeException {
    private RestResponse restResponse;
    private final MessageSource messageSource;
    private static final Logger log = LoggerFactory.getLogger(RestControllerExceptionAdvice.class);

    public RestControllerExceptionAdvice(RestResponse restResponse, MessageSource messageSource) {
        this.restResponse=restResponse;
        this.messageSource = messageSource;
    }
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(Exception.class)
    public RestResponse handlerException(Exception e, HttpServletRequest req) {

        e.printStackTrace();
        String code = String.valueOf(HttpStatus.BAD_REQUEST.value());
        log.error("errorCode : " + getMessage(code+".code"));
        log.error("errorMsg : " + getMessage(code+".msg"));

        return restResponse.error(Integer.valueOf(getMessage(code+".code")), getMessage(code+".msg"));
    }

    /**
     * 런타임 에러 -> 서비스 에러 처리
     * @param e
     * @param req
     * @return
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(RuntimeException.class)
    public RestResponse handlerRuntimeException(Exception e, HttpServletRequest req) {

        e.printStackTrace();
        String code = String.valueOf(HttpStatus.BAD_REQUEST.value());
        log.error("errorCode : " + getMessage(code+".code"));
        log.error("errorMsg : " + getMessage(code+".msg"));

        return restResponse.error(Integer.valueOf(getMessage(code+".code")), getMessage(code+".msg"));
    }

    private String getMessage(String code) {
        return getMessage(code, null);
    }

    private String getMessage(String code, Object[] args) {
        return messageSource.getMessage(code, args, LocaleContextHolder.getLocale());
    }

//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(BadCredentialsException.class)
//    protected ResponseEntity<RestResponse> handleBadCredentialsException(BadCredentialsException e) {
//        RestResponse response = new RestResponse();
//        e.printStackTrace();
//        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
//    }
//    @ResponseStatus(HttpStatus.BAD_REQUEST)
//    @ExceptionHandler(UsernameNotFoundException.class)
//    protected ResponseEntity<RestResponse> handleUsernameNotFoundExceptionException(UsernameNotFoundException e) {
//        RestResponse response = new RestResponse();
//        e.printStackTrace();
//        return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
//    }
}