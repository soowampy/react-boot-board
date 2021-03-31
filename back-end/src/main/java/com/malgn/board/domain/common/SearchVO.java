package com.malgn.board.domain.common;

import java.io.Serializable;
import java.util.List;


public class SearchVO implements Serializable {
    private String searchCondition; // 검색어 종류
    private String searchKeyword; // 검색어
    private String searchTagId; // 태그 아이디
    private List<String> searchTagList; // 태그 리스트
    private String searchCateId; // 카테고리 아이디
    private String searchPCateId; // 자식 카테고리 아이디
    private List<String> searchCateList; // 카테고리 리스트

    private String strDate;
    private String endDate;
    private String searchOrder;

    public String getSearchOrder() {
        return searchOrder;
    }

    public void setSearchOrder(String searchOrder) {
        this.searchOrder = searchOrder;
    }

    public String getSearchCondition() {
        return searchCondition;
    }

    public void setSearchCondition(String searchCondition) {
        this.searchCondition = searchCondition;
    }

    public String getSearchKeyword() {
        return searchKeyword;
    }

    public void setSearchKeyword(String searchKeyword) {
        this.searchKeyword = searchKeyword;
    }

    public String getSearchTagId() {
        return searchTagId;
    }

    public void setSearchTagId(String searchTagId) {
        this.searchTagId = searchTagId;
    }

    public List<String> getSearchTagList() {
        return searchTagList;
    }

    public void setSearchTagList(List<String> searchTagList) {
        this.searchTagList = searchTagList;
    }

    public String getSearchCateId() {
        return searchCateId;
    }

    public void setSearchCateId(String searchCateId) {
        this.searchCateId = searchCateId;
    }

    public String getSearchPCateId() {
        return searchPCateId;
    }

    public void setSearchPCateId(String searchPCateId) {
        this.searchPCateId = searchPCateId;
    }

    public List<String> getSearchCateList() {
        return searchCateList;
    }

    public void setSearchCateList(List<String> searchCateList) {
        this.searchCateList = searchCateList;
    }


    public String getStrDate() {
        return strDate;
    }

    public void setStrDate(String strDate) {
        this.strDate = strDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public SearchVO(String searchCondition, String searchKeyword, String searchTagId, List<String> searchTagList, String searchCateId, String searchPCateId, List<String> searchCateList, String strDate, String endDate) {
        this.searchCondition = searchCondition;
        this.searchKeyword = searchKeyword;
        this.searchTagId = searchTagId;
        this.searchTagList = searchTagList;
        this.searchCateId = searchCateId;
        this.searchPCateId = searchPCateId;
        this.searchCateList = searchCateList;
        this.strDate = strDate;
        this.endDate = endDate;
    }

    public SearchVO(){};

    @Override
    public String toString() {
        return "SearchVO{" +
                "searchCondition='" + searchCondition + '\'' +
                ", searchKeyword='" + searchKeyword + '\'' +
                ", searchTagId='" + searchTagId + '\'' +
                ", searchTagList=" + searchTagList +
                ", searchCateId='" + searchCateId + '\'' +
                ", searchPCateId='" + searchPCateId + '\'' +
                ", searchCateList=" + searchCateList +
                ", strDate='" + strDate + '\'' +
                ", endDate='" + endDate + '\'' +
                '}';
    }
}
