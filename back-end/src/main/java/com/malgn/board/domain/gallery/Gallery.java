package com.malgn.board.domain.gallery;

import java.util.List;

public class Gallery {

    private int imgId; // 이미지 고유 아이디 IMG_ID
    private String cateId; // 카테고리 고유 아이디 CATE_ID
    private String catePId; // 카테고리 자식 아이디
    private String cateName; // 카테고리 이름 CATE_NAME
    private List<String> cateList; // 부모카테고리까지 카테고리 리스트
    private String mId; // 글쓴이 id M_ID
    private String mName; // 글쓴이 이름 IMG_USER

    private String imgTitle; // 이미지 이름 IMG_TITLE

    private String imgTag; // 이미지 태그 IMG_TAGE
//    private String tagId; // 태그 고유 아이디 TAG_ID

    private String imgSrc; // 이미지 주소 IMG_SRC
    private String imgTSrc; // 썸네일 주소 IMG_TSRC

    private String imgDate; // 업로드 날짜 IMG_UPDATE
    private String imgUpdate; // 업데이트 날짜 IMG_UPDATE

    private String delAuth; // 삭제권한

    public int getImgId() {
        return imgId;
    }

    public String getCateId() {
        return cateId;
    }

    public String getCateName() {
        return cateName;
    }

    public String getmId() {
        return mId;
    }

    public String getmName() {
        return mName;
    }

    public String getImgTitle() {
        return imgTitle;
    }

    public String getImgTag() {
        return imgTag;
    }

//    public String getTagId() {
//        return tagId;
//    }

    public String getImgSrc() {
        return imgSrc;
    }

    public String getImgDate() {
        return imgDate;
    }

    public String getImgUpdate() {
        return imgUpdate;
    }

    public void setImgId(int imgId) {
        this.imgId = imgId;
    }

    public void setCateId(String cateId) {
        this.cateId = cateId;
    }

    public void setCateName(String cateName) {
        this.cateName = cateName;
    }

    public void setmId(String mId) {
        this.mId = mId;
    }

    public void setmName(String mName) {
        this.mName = mName;
    }

    public void setImgTitle(String imgTitle) {
        this.imgTitle = imgTitle;
    }

    public void setImgTag(String imgTag) {
        this.imgTag = imgTag;
    }

//    public void setTagId(String tagId) {
//        this.tagId = tagId;
//    }

    public void setImgSrc(String imgSrc) {
        this.imgSrc = imgSrc;
    }

    public void setImgDate(String imgDate) {
        this.imgDate = imgDate;
    }

    public void setImgUpdate(String imgUpdate) {
        this.imgUpdate = imgUpdate;
    }

    public String getCatePId() {
        return catePId;
    }

    public void setCatePId(String catePId) {
        this.catePId = catePId;
    }

    public String getDelAuth() {
        return delAuth;
    }

    public void setDelAuth(String delAuth) {
        this.delAuth = delAuth;
    }

    public String getImgTSrc() {
        return imgTSrc;
    }

    public void setImgTSrc(String imgTSrc) {
        this.imgTSrc = imgTSrc;
    }

    public List<String> getCateList() {
        return cateList;
    }

    public void setCateList(List<String> cateList) {
        this.cateList = cateList;
    }

    public Gallery(){}

    public Gallery(int imgId, String cateId, String catePId, String cateName, List<String> cateList, String mId, String mName, String imgTitle, String imgTag, String tagId, String imgSrc, String imgTSrc, String imgDate, String imgUpdate, String delAuth) {
        this.imgId = imgId;
        this.cateId = cateId;
        this.catePId = catePId;
        this.cateName = cateName;
        this.cateList = cateList;
        this.mId = mId;
        this.mName = mName;
        this.imgTitle = imgTitle;
        this.imgTag = imgTag;
        this.imgSrc = imgSrc;
        this.imgTSrc = imgTSrc;
        this.imgDate = imgDate;
        this.imgUpdate = imgUpdate;
        this.delAuth = delAuth;
    }

    @Override
    public String toString() {
        return "Gallery{" +
                "imgId=" + imgId +
                ", cateId='" + cateId + '\'' +
                ", catePId='" + catePId + '\'' +
                ", cateName='" + cateName + '\'' +
                ", cateList='" + cateList + '\'' +
                ", mId='" + mId + '\'' +
                ", mName='" + mName + '\'' +
                ", imgTitle='" + imgTitle + '\'' +
                ", imgTag='" + imgTag + '\'' +
                ", imgSrc='" + imgSrc + '\'' +
                ", imgTSrc='" + imgTSrc + '\'' +
                ", imgDate='" + imgDate + '\'' +
                ", imgUpdate='" + imgUpdate + '\'' +
                ", delAuth='" + delAuth + '\'' +
                '}';
    }
}
