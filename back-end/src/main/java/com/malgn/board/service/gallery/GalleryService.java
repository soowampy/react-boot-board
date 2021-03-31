package com.malgn.board.service.gallery;

import com.malgn.board.domain.gallery.*;
import com.malgn.board.domain.common.SearchVO;
import com.malgn.board.domain.common.PageInfo;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
/**
 *
 * @Class Name : GalleryService.java
 * @Description : 갤러리 서비스 구현 클래스
 *
 *
 *      수정일           수정자         수정내용
 *    ----------      -------     ---------------
 *    2020. 12. 11.    유수완         최초생성
 *
 * @author 응용소프트웨어개발팀 유수완
 * @since 2020. 12. 11.
 * @version
 *
 */
public interface GalleryService {

    /**
     * 전체 카테고리 리스트를 갖고온다
     *
     * @param
     * @return List 전체 카테고리 리스트
     */
    List<Category> getCateList();


    /**
     * 파일 정보를 DB에 저장한다.
     *
     * @param gallery 파일 정를
     * @return int imgId
     */
    int insertFile(Gallery gallery)  throws Exception;


    /**
     * 태그 정보를 DB에 저장한다.
     *
     * @param tag xorm 정
     * @return int imgId
     */
    void insertTag(Tag tag)  throws Exception;

    /**
     * 등록된 전체 태그 리스트를 가져온다.
     *
     * @return List<TagVO>
     */
    List<Tag> getTagList();

    /**
     * 갤러라 리스트를 가져온다.
     * @param pageInfo 페이징 searchVO 검색 정보
     * @return List<Gallery>
     */
    List<Gallery> getImgList(PageInfo pageInfo, SearchVO searchVO);

    /**
     * 이미지 수를 가져온다.
     * @param searchVO 검색 정보
     * @return int
     */
    int getImgCount(SearchVO searchVO);

    /**
     * 이미지 정보를 가져온다.
     * @param imgId 이미지 아이디
     * @return Gallery
     */
    Gallery getGalleryVO(int imgId);

    /**
     * 태그 정보를 가져온다.
     * @param imgId 이미지 아이디
     * @return List<TagVO>
     */
    List<Tag> getImgTagList(int imgId);

    /**
     * 이미지 정보를 수정한다
     * @param paramMap 이미지 아이디
     */
    int update(Map<String, Object> paramMap)  throws Exception;

    /**
     * 이미지 정보를 삭제한다
     * @param imgId 이미지 아이디
     */
    int deleteBoard(Integer bNo)  throws Exception;






    // 파일첨부
    int uploadFile(MultipartFile file,String bNo,String fileLevel, String size) throws Exception;

    // 대용량첨부
    int uploadBigFile(byte[] file,String fileName,String bNo,String fileLevel,String slice,String newName,boolean flag,String size) throws IOException;

    // 글쓰기
    int insertBoard(Board b);

    // 리스트
    List<Board> getBoardList(PageInfo pageInfo,SearchVO searchVO);

    // 전체페이지
    int getTotalPage(SearchVO searchVO);

    // 게시글 상세
    Board getBoardDetail(int bNo);

    // 파일다운로드
    Files getFileInfo(Integer fileNo);

}
