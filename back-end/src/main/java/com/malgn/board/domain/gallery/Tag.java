package com.malgn.board.domain.gallery;

import java.util.List;

public class Tag {
    private int tagId; // 태그 아이디
    private String tagName; // 태그 이름(내용)
    private int imgId; // 이미지 아이디
    private List<String> tagList;
    private int tagCount;


    public Tag(){};

    public int getTagId() {
        return tagId;
    }

    public void setTagId(int tagId) {
        this.tagId = tagId;
    }

    public String getTagName() {
        return tagName;
    }

    public void setTagName(String tagName) {
        this.tagName = tagName;
    }

    public int getImgId() {
        return imgId;
    }

    public void setImgId(int imgId) {
        this.imgId = imgId;
    }

    public List<String> getTagList() {
        return tagList;
    }

    public void setTagList(List<String> tagList) {
        this.tagList = tagList;
    }

    public int getTagCount() {
        return tagCount;
    }

    public void setTagCount(int tagCount) {
        this.tagCount = tagCount;
    }


    public Tag(int tagId, String tagName, int imgId, List<String> tagList, int tagCount) {
        this.tagId = tagId;
        this.tagName = tagName;
        this.imgId = imgId;
        this.tagList = tagList;
        this.tagCount = tagCount;
    }

    @Override
    public String toString() {
        return "TagVO{" +
                "tagId=" + tagId +
                ", tagName='" + tagName + '\'' +
                ", imgId=" + imgId +
                ", tagList=" + tagList +
                ", tagCount=" + tagCount +
                '}';
    }
}
