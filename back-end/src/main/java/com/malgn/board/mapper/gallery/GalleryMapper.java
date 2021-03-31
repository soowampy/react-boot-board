package com.malgn.board.mapper.gallery;

import com.malgn.board.domain.gallery.*;
import com.malgn.board.domain.common.SearchVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Mapper
public interface GalleryMapper {

    List<Category> getCateList();

    int insertFile(Gallery gallery);

    int insertTag(Map<String,Object> tagVO);
    int insertImgTag(Map<String,Object> tagVO);

    int getTagCount(String tagName);

    ArrayList<Tag> selectTagList(Map<String, Object> tagMap);

    List<Tag> getTagList();

    List<Gallery> getImgList(Map<String,Object> paramMap, RowBounds rowBounds);
    List<Gallery> getImgList(Map<String,Object> paramMap);

    int getImgCount(SearchVO searchVO);

    Gallery getGalleryVO(int imgId);

    List<Tag> getImgTagList(int imgId);

    int update(Board board);

    int deleteTag(int imgId);

    int deleteBoard(Integer bNo);

    List<String> getGalleryVOCate(int cateId);

    void allDeleteById(String id);

    int getBoardCurrentNo();

    int insertBigFile(Files f);

    int insertBoard(Board b);

    //List<Board> getBoardList(RowBounds rowBounds,SearchVO searchVO);
    List<Board> getBoardList(Map<String,Object> paramMap,RowBounds rowBounds);

    int getBoardCount(SearchVO searchVO);

    List<Files> getFilesList(int bNo);
    List<Files> getDetailFilesList(int bNo);

    int getFilesCount(int bNo);

    Files getFileInfo(int fileNo);

    List<Files> getFileInfoDetail(Files files);

    int deleteBigFile(int fileNo);

    int insertThumbnail(Files thumbnail);

    // detail
    Board getBoardDetail(int bNo);
    List<Files> getBoardDetailFilesList(int bNo);

    // 파일 업데이트
    int deleteFiles(String[] fList);
}
