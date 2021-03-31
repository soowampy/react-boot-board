package com.malgn.board.domain.gallery;

public class Files {
    private int fileNo;
    private int bNo;
    private String originName;
    private String changeName;
    private String path;
    private String realPath;
    private String enrollDate;
    private String modifyDate;
    private int level;
    private String info;
    private int size;
    private String ext;
    private int slice;
    private String fileKinds;
    private String mediaType;

    //thumb
    private int thumbNo;
    private String thumbPath;

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public int getThumbNo() {
        return thumbNo;
    }

    public void setThumbNo(int thumbNo) {
        this.thumbNo = thumbNo;
    }

    public String getThumbPath() {
        return thumbPath;
    }

    public void setThumbPath(String thumbPath) {
        this.thumbPath = thumbPath;
    }

    public String getFileKinds() {
        return fileKinds;
    }

    public void setFileKinds(String fileKinds) {
        this.fileKinds = fileKinds;
    }

    public String getRealPath() {
        return realPath;
    }

    public void setRealPath(String realPath) {
        this.realPath = realPath;
    }

    public int getSlice() {
        return slice;
    }

    public void setSlice(int slice) {
        this.slice = slice;
    }

    public int getFileNo() {
        return fileNo;
    }

    public void setFileNo(int fileNo) {
        this.fileNo = fileNo;
    }

    public int getbNo() {
        return bNo;
    }

    public void setbNo(int bNo) {
        this.bNo = bNo;
    }

    public String getOriginName() {
        return originName;
    }

    public void setOriginName(String originName) {
        this.originName = originName;
    }

    public String getChangeName() {
        return changeName;
    }

    public void setChangeName(String changeName) {
        this.changeName = changeName;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
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

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }

    @Override
    public String toString() {
        return "Files{" +
                "fileNo=" + fileNo +
                ", bNo=" + bNo +
                ", originName='" + originName + '\'' +
                ", changeName='" + changeName + '\'' +
                ", path='" + path + '\'' +
                ", realPath='" + realPath + '\'' +
                ", enrollDate='" + enrollDate + '\'' +
                ", modifyDate='" + modifyDate + '\'' +
                ", level=" + level +
                ", info='" + info + '\'' +
                ", size=" + size +
                ", ext='" + ext + '\'' +
                ", slice=" + slice +
                ", fileKinds='" + fileKinds + '\'' +
                '}';
    }
}
