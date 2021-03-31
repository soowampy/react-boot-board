package com.malgn.board.domain.common;

import org.springframework.stereotype.Component;

@Component
public class RestResponse<T> {

    private T result; // 결과
    private int code; // 성공 코드 반환
    private String message; // 성공 메세지

    private int errorCode; // 에러 코드
    private String errorMessage=""; // 에러 메세지

    public RestResponse(){

    }

    //성공
    public RestResponse(T result, int code, String message) {
        this.result = result;
        this.code = code;
        this.message = message;
    }

    // 성공했을때 메소드
    public RestResponse success(T result){
        return new RestResponse(result, 200, "succes");
    }


    //에러
    public RestResponse(int errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }


    public RestResponse error(int errorCode, String errorMessage){
        return new RestResponse(errorCode, errorMessage);
    }

    public RestResponse(T result, int code, String message, int errorCode, String errorMessage) {
        this.result = result;
        this.code = code;
        this.message = message;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public T getResult() {
        return result;
    }

    public void setResult(T result) {
        this.result = result;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    @Override
    public String toString() {
        return "RestResponse{" +
                "result=" + result +
                ", code=" + code +
                ", message='" + message + '\'' +
                ", errorCode=" + errorCode +
                ", errorMessage='" + errorMessage + '\'' +
                '}';
    }

}