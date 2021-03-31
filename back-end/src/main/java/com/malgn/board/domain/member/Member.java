package com.malgn.board.domain.member;

import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

// DB 유저 정보
@Component
public class Member  implements Serializable {

    private String id;
    private String name;
    private String email;
    private String password;
    private String type;
    private String regDate;
    private int mNo;
    private List<MemberAuth> authList;

    public Member(String id, String name, String email, String password, String type, String regDate, int mNo, List<MemberAuth> authList) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this.regDate = regDate;
        this.mNo = mNo;
        this.authList = authList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Member)) return false;
        Member member = (Member) o;
        return getmNo() == member.getmNo() &&
                Objects.equals(getId(), member.getId()) &&
                Objects.equals(getName(), member.getName()) &&
                Objects.equals(getEmail(), member.getEmail()) &&
                Objects.equals(getPassword(), member.getPassword()) &&
                Objects.equals(getType(), member.getType()) &&
                Objects.equals(getRegDate(), member.getRegDate()) &&
                Objects.equals(getAuthList(), member.getAuthList());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId(), getName(), getEmail(), getPassword(), getType(), getRegDate(), getmNo(), getAuthList());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    public int getmNo() {
        return mNo;
    }

    public void setmNo(int mNo) {
        this.mNo = mNo;
    }

    public List<MemberAuth> getAuthList() {
        return authList;
    }

    public void setAuthList(List<MemberAuth> authList) {
        this.authList = authList;
    }

    public Member(){}

    @Override
    public String toString() {
        return "Member{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", type='" + type + '\'' +
                ", regDate='" + regDate + '\'' +
                ", mNo=" + mNo +
                '}';
    }
}

