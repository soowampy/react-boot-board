package com.malgn.board.domain.gallery;

import java.util.List;

public class Board {
    private int bNo;
    private String title;
    private String mId;
    private int cateId;
    private String enrollDate;
    private String modifyDate;
    private List<Files> fileList;
    private int fileListLength;
    private String cateList; // 부모카테고리까지 카테고리 리스트
    private String mName;

    private String cateName;
    private String bTag;
    public String getCateName() {
        return cateName;
    }

    public void setCateName(String cateName) {
        this.cateName = cateName;
    }

    public String getmName() {
        return mName;
    }

    public void setmName(String mName) {
        this.mName = mName;
    }

    public int getFileListLength() {
        return fileListLength;
    }

    public void setFileListLength(int fileListLength) {
        this.fileListLength = fileListLength;
    }

    public List<Files> getFileList() {
        return fileList;
    }

    public void setFileList(List<Files> fileList) {
        this.fileList = fileList;
    }

    public int getbNo() {
        return bNo;
    }

    public void setbNo(int bNo) {
        this.bNo = bNo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getmId() {
        return mId;
    }

    public void setmId(String mId) {
        this.mId = mId;
    }

    public int getCateId() {
        return cateId;
    }

    public void setCateId(int cateId) {
        this.cateId = cateId;
    }

    public String getEnrollDate() {
        return enrollDate;
    }

    public void setEnrollDate(String enrollDate) {
        this.enrollDate = enrollDate;
    }

    public String getModifyDate() {
        return modifyDate;
    }

    public void setModifyDate(String modifyDate) {
        this.modifyDate = modifyDate;
    }

    public String getbTag() {
        return bTag;
    }

    public void setbTag(String bTag) {
        this.bTag = bTag;
    }
    public String getCateList() {
        return cateList;
    }

    public void setCateList(String cateList) {
        this.cateList = cateList;
    }
    @Override
    public String toString() {
        return "Board{" +
                "bNo=" + bNo +
                ", title='" + title + '\'' +
                ", mId='" + mId + '\'' +
                ", cateId=" + cateId +
                ", enrollDate='" + enrollDate + '\'' +
                ", modifyDate='" + modifyDate + '\'' +
                '}';
    }
}
