package com.malgn.board.common.exception;

import java.util.ArrayList;
import java.util.List;

public class ApiErrorInfo {

    private String message;

    private final List<ApiErrorDetailInfo> details = new ArrayList<ApiErrorDetailInfo>();

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void addDetailInfo(String target, String message) {
        details.add(new ApiErrorDetailInfo(target, message));
    }

    public List<ApiErrorDetailInfo> getDetails() {
        return details;
    }

}