package com.malgn.board.controller.gallery;
import com.malgn.board.domain.common.RestResponse;
import com.malgn.board.domain.gallery.*;
import com.malgn.board.domain.common.SearchVO;
import com.malgn.board.domain.member.Member;
import com.malgn.board.service.admin.AdminService;
import com.malgn.board.service.gallery.GalleryService;
import com.malgn.board.domain.common.PageInfo;
import com.malgn.board.util.AuthUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


//@RequestMapping("/gallery")
@RestController
public class GalleryRestController {

    private final GalleryService gService;
    private final AdminService aService;
    private RestResponse restResponse;

    public GalleryRestController(GalleryService gService,RestResponse restResponse,AdminService aService) {
        this.gService = gService;
        this.restResponse = restResponse;
        this.aService = aService;
    }
    private static final Logger log = LoggerFactory.getLogger(GalleryRestController.class);

    // #################### 0. 공통 ######################
    /**
     ** 0. 카테고리 리스트 가져오기 [get]
     * - 전체 사진 리스트 화면에서 출력
     * - 사진 등록 화면에서 출력
     * - 사진 수정 화면에서 출력
     *
     */
    @GetMapping(path="api/category/list")
    public RestResponse<List<Category>> getCateList() {
        log.debug("Call /api/category/list" + " [get]");
        return restResponse.success(gService.getCateList());
    }

    // ################## 1. 리스트 ########################
    @GetMapping(path="api/board/list")
    public RestResponse<List<Category>> getBoardList(Integer page, String category, String strDate,String endDate, String tagList, String condition, String keyword,String order) {
        log.debug("Call /api/board/list" + " [get]");
        int currentPage = 1;
        // 전달받은 페이지 정보가 있다면 현재 페이지정보를 전달받은 값으로 설정
        if (page != null  && !page.equals("")) {
            currentPage = page;
        }

        // 한 페이지에 표시할 이미지 수
        // 기본값은 12
        int setLimit = 12;

        PageInfo pageInfo = new PageInfo(currentPage, setLimit);
        // 검색
        SearchVO searchVO = new SearchVO();

        if(order !=null && !order.equals("")){
            searchVO.setSearchOrder(order);
        }else{
            searchVO.setSearchOrder("desc");
        }

        if(category !=null && !category.equals("")){
            searchVO.setSearchCateId(category);
        }

        if(strDate !=null && !strDate.equals("")){
            searchVO.setStrDate(strDate);
            searchVO.setEndDate(endDate);
        }

        if(tagList !=null && !tagList.equals("")){
            String[] temp = tagList.split(",");
            List<String> tmpList = new ArrayList<>();
            for(String tag : temp){
                tmpList.add(tag);
            }
            searchVO.setSearchTagList(tmpList);
        }

        searchVO.setSearchCondition(condition);
        searchVO.setSearchKeyword(keyword);
        List<Board> list  = gService.getBoardList(pageInfo,searchVO);

        return restResponse.success(list);
    }

    // ############# 2. 등록 ###############
    /**
     * 게시글 DB 에 등록
     * */
    @PostMapping(path="api/board/write")
    public RestResponse<Integer> regBoard(String title, String category, String tag,@RequestHeader (name="Authorization") String header) throws Exception {
        int userNo = AuthUtil.getUserNo(header);
        Member member = aService.read(userNo);

        Board b = new Board();
        b.setTitle(title);
        b.setCateId(Integer.parseInt(category));
        b.setmId(member.getId());

        int boardNo= gService.insertBoard(b);

        if(tag!=null && !tag.equals("")){
            Tag tags = new Tag();
            tags.setImgId(boardNo);
            tags.setTagName(tag);
            gService.insertTag(tags);
        }

        return restResponse.success(boardNo);
    }

    /**
     * 일반파일업로드, db등록
     * */
    @PostMapping(path="api/board/upload")
    public RestResponse<Integer> regBoardFile(MultipartFile file,String bNo, String fileLevel, String size) throws Exception {
        int imgId = gService.uploadFile(file,bNo,fileLevel,size);
        return restResponse.success(imgId);
    }

    /**
     * 대용량업로드, db 등
     * */
    @PostMapping(path="api/board/bigFileUpload")
    public RestResponse<Integer> regBoardBigFile(@RequestBody byte[] bigFile, String fileName, String bNo, String fileLevel,String numberOfSlices,String newName,boolean flag,String size) throws Exception {
        log.debug("Call /api/board/bigFileUpload" + " [get]");
        int imgId = gService.uploadBigFile(bigFile,fileName,bNo,fileLevel,numberOfSlices,newName,flag,size);
        return restResponse.success(imgId);
    }

    /**
     ** 2.1 태그 리스트 [get]
     * 메인 화면에 전체 태그 리스트 가져옴
     * @return RestResponse(태그 리스트,성공 코드,성공 메세지)
     */
    @GetMapping(path="api/tag/list")
    public RestResponse<List<Tag>> getTagList() {
        log.debug("Call /gallery/tag/list" + " [get]");
        return restResponse.success(gService.getTagList());
    }


    @GetMapping(path="api/board/totalPage")
    public RestResponse<Integer> getTotalPage(Integer page, String category, String strDate,String endDate, String tagList, String condition, String keyword) {
        log.debug("Call /api/board/totalPage" + " [get]");
        SearchVO searchVO = new SearchVO();
        if(category !=null && !category.equals("")){
            searchVO.setSearchCateId(category);
        }

        if(strDate !=null){
            searchVO.setStrDate(strDate);
            searchVO.setEndDate(endDate);
        }

        if(tagList !=null && !tagList.equals("")){
            String[] temp = tagList.split(",");
            List<String> tmpList = new ArrayList<>();
            for(String tag : temp){
                tmpList.add(tag);
            }
            searchVO.setSearchTagList(tmpList);
        }
        searchVO.setSearchCondition(condition);
        searchVO.setSearchKeyword(keyword);
        return restResponse.success(gService.getTotalPage(searchVO));
    }

    /***
     * detail
     * */
    @GetMapping(path="api/board/detail/{bNo}")
    public RestResponse<Integer> getBoardDetail(@PathVariable int bNo) {
        log.debug("Call /api/board/totalPage" + " [get]");
        return restResponse.success(gService.getBoardDetail(bNo));
    }


    /**
     * 게시글 태그조회
     * */
    @GetMapping(path="api/board/tag/{bNo}")
    public RestResponse<List<Tag>> getTagList(@PathVariable int bNo) {
        log.debug("Call /api/board/tag/"+bNo + " [get]");
        return restResponse.success(gService.getImgTagList(bNo));
    }


    /***
     * 파일 다운로드
     * */
    @GetMapping(path = "api/board/download/{fileNo}")
    public void downloadFile(@PathVariable(name="fileNo") Integer fileNo, HttpServletResponse response) throws IOException {
        Files fileInfo = gService.getFileInfo(fileNo);
        response.setHeader("Content-Disposition", "attachment; filename=\"" + fileInfo.getChangeName() + "\"");
        response.setHeader("Content-Transfer-Encoding", "binary");
        response.setHeader("Content-Type", "application/octet-stream");
        //response.setHeader("Content-Length", fileLength);
        response.setHeader("Pragma", "no-cache;");
        response.setHeader("Expires", "-1;");

        OutputStream os = response.getOutputStream();
        FileInputStream fis = new FileInputStream(fileInfo.getRealPath());

        int readCount = 0;
        byte[] buffer = new byte[1024];

        while((readCount = fis.read(buffer)) != -1) {
            os.write(buffer, 0, readCount);
        }

        fis.close();
        os.close();

    }

    // ################## 3. 수정 #################

    /**
     ** 3.2 이미지 수정 [put]
     * 이미지 정보를 수정함 (제목, 카테고리, 태그정보)
     * @param bNo 이미지 ID
     * @param tag tagName 입력받은 태그 리스트 (,로 받아옴)
     * @param gallery cateId 카테고리 고유ID, imgTitle 이미지 제목
     */
    @PutMapping(path="api/board/update/{bNo}")
    public RestResponse<Integer> update(@PathVariable Integer bNo,String title, String category, String tag, String file) throws Exception {
        log.debug("Call /gallery/img/"+bNo + " [put]");
        log.debug("Gallery title : " + title);
        log.debug("tag : " + tag);
        log.debug("file : " + file);

        Tag tags = new Tag();
        tags.setTagName(tag);
        tags.setImgId(bNo);

        Board board = new Board();
        if(!category.equals("")){
            board.setCateId(Integer.parseInt(category));
        }
        board.setbNo(bNo);
        board.setTitle(title);

        Map<String,Object> paramMap = new HashMap<>();
        paramMap.put("tagVO", tags);
        paramMap.put("boardVO", board);
        paramMap.put("file",file);

        int result = gService.update(paramMap);

        return restResponse.success(result);
    }


    /**
     * 삭제
     * */
    @DeleteMapping(path="api/board/{bNo}")
    public RestResponse<Integer> delete(@PathVariable Integer bNo,  Authentication auth) throws Exception {
        log.debug("Call /api/board/"+bNo + " [delete]");

        // 테스트할땐주석처리
        // 1. 권한 체크
//        Gallery gVO = gService.getGalleryVO(imgId);
//        Member nowUser= (Member)auth.getPrincipal();

//        int result = 0;
        // 현재 로그인되어있는 유저 정보가 관리자 권한이거나 작성자 정보와 일치할 때만 삭제 가능
//        if(nowUser.getType().equals("ROLE_ADMIN") || nowUser.getId().equals(gVO.getmId())){
//            result = gService.deleteImg(imgId);
//        }else{
//            throw new Exception("권한이 없습니다");
//        }

        int result=0;
        result = gService.deleteBoard(bNo);

        return restResponse.success(result);
    }





}

