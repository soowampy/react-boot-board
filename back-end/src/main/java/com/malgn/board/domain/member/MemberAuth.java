package com.malgn.board.domain.member;

public class MemberAuth {

    private int userNo;
    private String auth;

    public int getUserNo() {
        return userNo;
    }

    public String getAuth() {
        return auth;
    }

    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    @Override
    public String toString() {
        return "MemberAuth{" +
                "userNo=" + userNo +
                ", auth='" + auth + '\'' +
                '}';
    }
}
