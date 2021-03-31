package com.malgn.board.service.gallery;


import com.malgn.board.common.properties.FileUploadProperites;
import com.malgn.board.domain.common.SearchVO;
import com.malgn.board.domain.gallery.*;
import com.malgn.board.domain.member.Member;
import com.malgn.board.domain.common.PageInfo;
import com.malgn.board.domain.common.Pagination;
import com.malgn.board.mapper.gallery.GalleryMapper;
import com.malgn.board.util.FileUtil;
import io.undertow.util.Cookies;
import org.apache.ibatis.session.RowBounds;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.servlet.server.Session;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.Cookie;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.CookieStore;
import java.rmi.server.UID;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;


@Service("gService")
public class GalleryServiceImpl implements GalleryService {

    private final FileUploadProperites fileUploadProperites;
    private final GalleryMapper galleryMapper;
    private static final Logger log = LoggerFactory.getLogger(GalleryServiceImpl.class);

    public GalleryServiceImpl(FileUploadProperites fileUploadProperites, GalleryMapper galleryMapper) {
        this.fileUploadProperites = fileUploadProperites;
        this.galleryMapper = galleryMapper;
    }


    protected String unscript(String data) {
        if (data == null || data.trim().equals("")) {
            return "";
        }

        String ret = data;
        ret = ret.replaceAll("<(S|s)(C|c)(R|r)(I|i)(P|p)(T|t)", "&lt;script");
        ret = ret.replaceAll("</(S|s)(C|c)(R|r)(I|i)(P|p)(T|t)", "&lt;/script");

        ret = ret.replaceAll("<(O|o)(B|b)(J|j)(E|e)(C|c)(T|t)", "&lt;object");
        ret = ret.replaceAll("</(O|o)(B|b)(J|j)(E|e)(C|c)(T|t)", "&lt;/object");

        ret = ret.replaceAll("<(A|a)(P|p)(P|p)(L|l)(E|e)(T|t)", "&lt;applet");
        ret = ret.replaceAll("</(A|a)(P|p)(P|p)(L|l)(E|e)(T|t)", "&lt;/applet");

        ret = ret.replaceAll("<(E|e)(M|m)(B|b)(E|e)(D|d)", "&lt;embed");
        ret = ret.replaceAll("</(E|e)(M|m)(B|b)(E|e)(D|d)", "&lt;embed");

        ret = ret.replaceAll("<(F|f)(O|o)(R|r)(M|m)", "&lt;form");
        ret = ret.replaceAll("</(F|f)(O|o)(R|r)(M|m)", "&lt;form");

        return ret;
    }


    /**
     * 전체 카테고리 리스트를 갖고온다
     *
     * @param
     * @return List 전체 카테고리 리스트
     */
    @Override
    public List<Category> getCateList() {
        List<Category> cateList = galleryMapper.getCateList();
        return cateList;
    }



    /**
     * 파일 정보를 DB에 저장한다.
     *
     * @param gallery 파일 정를
     * @return int imgId
     */
    @Override
    @Transactional
    public int insertFile(Gallery gallery) throws Exception {

        //테스트할땐 주석처리
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member userDetails = (Member) principal;

        if (userDetails != null) {
            gallery.setmId(userDetails.getId());
            gallery.setmName(userDetails.getName());
        } else {
            throw new RuntimeException();
        }

        // 테스트..
//        gallery.setmId("user03");
//        gallery.setmName("uesr03");

        gallery.setImgTitle(unscript(gallery.getImgTitle()));
        int result = galleryMapper.insertFile(gallery);
        if (result == 0) {
            throw new RuntimeException("파일 등록에 실패했습니다.");
        }

        int param = 0;
        // TAG가 있을 때 TAG 테이블에 IMG_ID를 입력하기 위해 selectKey 사용, imgId값 반환됨
        param = gallery.getImgId();
        return param;
    }

    /**
     * 태그 정보를 DB에 저장한다.
     *
     * @param tagVO xorm 정
     * @return int imgId
     */
    @Override
    @Transactional
    public void insertTag(Tag tagVO) {
        tagVO.getTagName().replaceAll(" ", "");
        String[] tagArray = tagVO.getTagName().split(",");
        ArrayList<Tag> tempList = new ArrayList<>();

        for (String item : tagArray) {
            Tag t = new Tag();
            t.setTagName(unscript(item));
            t.setImgId(tagVO.getImgId());
            tempList.add(t);
        }

        ArrayList<Tag> tagList = new ArrayList<>();
        // 태그 중복 검사
        for (Tag tag : tempList) {
            int tagCount = galleryMapper.getTagCount(tag.getTagName());
            if (tagCount == 0) {
                tagList.add(tag);
            }
        }

        Map<String, Object> tagMap = new HashMap<String, Object>();
        if (!tagList.isEmpty()) {
            tagMap.put("tagList", tagList);
            // TAG 테이블에 넣기insertTag
            galleryMapper.insertTag(tagMap);
        }
        // 입력한 TAG ID값 SELECT
        ArrayList<Tag> selectTagList = new ArrayList<>();
        tagMap.put("tagList", tempList);
        selectTagList = galleryMapper.selectTagList(tagMap);

        Map<String, Object> imgTagMap = new HashMap<>();
        imgTagMap.put("tagList", selectTagList);
        imgTagMap.put("imgId", tagVO.getImgId());

        galleryMapper.insertImgTag(imgTagMap);
    }

    /**
     * 등록된 전체 태그 리스트를 가져온다.
     *
     * @return List<TagVO>
     */
    @Override
    public List<Tag> getTagList() {
        return galleryMapper.getTagList();
    }


    /**
     * 갤러라 리스트를 가져온다.
     *
     * @param pageInfo 페이징 searchVO 검색 정보
     * @return List<Gallery>
     */
    @Override
    public List<Gallery> getImgList(PageInfo pageInfo, SearchVO searchVO) {
        if (searchVO.getStrDate() != null && searchVO.getStrDate().equals("")) {
            searchVO.setStrDate(null);
            searchVO.setEndDate(null);
        }

        if (searchVO.getSearchCateId() != null && searchVO.getSearchCateId().equals("")) {
            searchVO.setSearchCateId(null);
        }

        if (searchVO.getSearchTagList() != null && searchVO.getSearchTagList().size() == 0) {
            searchVO.setSearchTagList(null);
        }


        // 게시글 수 조회
        int listCount = galleryMapper.getImgCount(searchVO);
        // 페이지 정보 저장
        PageInfo pi = Pagination.getPageInfo(pageInfo.getCurrentPage(), listCount, pageInfo.getBoardLimit());
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("searchVO", searchVO);
        paramMap.put("pi", pi);

        // 페이징
        int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
        RowBounds rowBounds = new RowBounds(offset, pi.getBoardLimit());

        return galleryMapper.getImgList(paramMap, rowBounds);
    }

    /**
     * 이미지 수를 가져온다.
     *
     * @param searchVO 검색 정보
     * @return int
     */
    @Override
    public int getImgCount(SearchVO searchVO) {
        if (searchVO.getStrDate() != null && searchVO.getStrDate().equals("")) {
            searchVO.setStrDate(null);
            searchVO.setEndDate(null);
        }

        if (searchVO.getSearchCateId() != null && searchVO.getSearchCateId().equals("")) {
            searchVO.setSearchCateId(null);
        }

        if (searchVO.getSearchTagList() != null && searchVO.getSearchTagList().size() == 0) {
            searchVO.setSearchTagList(null);
        }
        return galleryMapper.getImgCount(searchVO);
    }

    /**
     * 이미지 정보 가져온다.
     *
     * @param imgId 이미지 아이디
     * @return Gallery
     */
    @Override
    public Gallery getGalleryVO(int imgId) {
        Gallery g = galleryMapper.getGalleryVO(imgId);
        List<String> list = galleryMapper.getGalleryVOCate(Integer.parseInt(g.getCateId()));
        if (list.size() != 0) {
            g.setCateList(list);
        }
        return g;
    }



    /**
     * 게시 정보를 수정한다
     *
     * @param paramMap 이미지 아이디
     */
    @Override
    @Transactional
    public int update(Map<String, Object> paramMap) throws Exception {
        // 게시글 정보 업데이트 (카테고리 정보, 제목)
        Board board = (Board) paramMap.get("boardVO");

        // ㅇㅜㅓㄴㄹㅐㅈㅓㅇㅂㅗ
        Board originBoard = getBoardDetail(board.getbNo());
        if(board.getTitle().equals("")){
            board.setTitle(originBoard.getTitle());
        }
        if(board.getCateId()==0){
            board.setCateId(originBoard.getCateId());
        }


        int result = galleryMapper.update(board);

        if (result == 0) {
            throw new RuntimeException();
        }

        // 태그 업데이트
        Tag tag = (Tag) paramMap.get("tagVO");
        if (tag.getTagName() != null && !tag.getTagName().equals("")) {
            // 태그 지우기
            galleryMapper.deleteTag(tag.getImgId());
            insertTag(tag);
        }else{
            List<Tag> tList = getImgTagList(board.getbNo());
            if(tList.size()!=0){
                galleryMapper.deleteTag(tag.getImgId());

            }
        }

        // 파일 업데이트 (ㅅㅏㄱㅈㅔ)
        String temp = (String)paramMap.get("file");
        if( temp !=null && !temp.equals("")){
            String[] fList = (temp.split(","));
            // 파일 삭제
            for(int i=0; i<fList.length; i++){
                //File f=  new File(fList.get(i).getRealPath());
                File f = new File(galleryMapper.getFileInfo(Integer.parseInt(fList[i])).getRealPath());
                if(f.exists()){
                    f.delete();
                }
            }
            // db ㅅㅏㄱㅈㅔ
            galleryMapper.deleteFiles(fList);
        }
        return result;
    }


    /**
     * 일반파일업로드
     */
    @Override
    @Transactional
    public int uploadFile(MultipartFile file, String bNo, String fileLevel,String size) throws Exception {
        int result = 0;
        // 1. 원본 파일 저장
        // 파일 저장 : 원본 파일 경로
        String uploadDir = fileUploadProperites.getUploadDir();
        String savePath = uploadDir + FileUtil.makeFolderPath();
        File folder = new File(savePath);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        String renameFile = UUID.randomUUID()
                + file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));

        // 원본파일 path
        String filePath = savePath + renameFile;

        String last = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);

        try {
            file.transferTo(new File(filePath));
//            // db에 입력
            Files f = new Files();
            f.setbNo(Integer.parseInt(bNo));
            f.setOriginName(file.getOriginalFilename());
            f.setChangeName(renameFile);
            f.setPath("/image" + FileUtil.makeFolderPath() + renameFile);
            f.setLevel(Integer.parseInt(fileLevel));
            f.setInfo("FILE");
            f.setExt(last);
            f.setSlice(1);
            f.setRealPath(filePath);
            f.setSize(Integer.parseInt(size));

            String[] extList = {"jpg", "jpeg", "gif", "bmp", "png",
                                "mkv", "avi", "mp4", "mpg", "flv", "wmv", "asf", "asx", "ogm", "ogv", "mov", "m4k",
                                "wav", "AIFF", "AU", "FLAC", "MP3", "WMV", "ACC", "WMA"};

            for (int i = 0; i < extList.length; i++) {
                if (last.toLowerCase().contains(extList[i].toLowerCase())) {
                    f.setFileKinds("MEDIA");

                    if(i>=0 && i<=4){
                        f.setMediaType("IMG");
                    }else if(i>=5 && i<=17){
                        f.setMediaType("VIDEO");
                    }else if(i>=18 && i<=extList.length-1){
                        f.setMediaType("AUDIO");
                    }else{
                        f.setMediaType("ERROR");
                    }
                    break;
                } else {
                    f.setFileKinds("ETC");
                }
            }
//            // 2. db 입력
            result = galleryMapper.insertBigFile(f);
            //썸네일만들기
            String[] imgList = {"jpg", "jpeg", "gif", "bmp", "png"};

            if(f.getFileKinds().equals("MEDIA") && f.getMediaType().equals("IMG")){
                for (int i = 0; i < imgList.length; i++) {
                    if (f.getExt().contains(imgList[i])) {
                        //썸네일만들기
                        String thumbFilePath = FileUtil.imageResize(file, filePath, uploadDir, last);

                        // 썸네일 디비저장
                        Files thumbnail = new Files();
                        thumbnail.setThumbPath(thumbFilePath);
                        thumbnail.setFileNo(f.getFileNo());
                        int thumbResult = galleryMapper.insertThumbnail(thumbnail);
                        break;
                    }
                }
            }
        } catch (Exception e) {
            throw new RuntimeException();
        }

        return result;
    }


    /**
     * 대용량파일업로
     */
    @Override
    @Transactional
    public int uploadBigFile(byte[] file, String fileName, String bNo, String fileLevel, String slice,String newName, boolean flag,String size) throws IOException {
        // 1. 원본 파일 저장
        // 파일 저장 : 원본 파일 경로
        String uploadDir = fileUploadProperites.getUploadDir();
        String savePath = uploadDir + FileUtil.makeFolderPath();
        File folder = new File(savePath);
        if (!folder.exists()) {
            folder.mkdirs();
        }
        String ext = fileName.substring(fileName.lastIndexOf(".") + 1);
        // 원본파일 path
        String filePath = savePath + newName + "." + ext;

        try {
            File lOutFile = new File(filePath);

            FileOutputStream lFileOutputStream = new FileOutputStream(lOutFile, true);
            lFileOutputStream.write(file);
            lFileOutputStream.close();

            // db에 입력
            if(flag){
                Files f = new Files();
                f.setbNo(Integer.parseInt(bNo));
                f.setOriginName(fileName);
                f.setChangeName(newName);
                f.setRealPath(filePath);
                f.setPath("/image" + FileUtil.makeFolderPath() + newName+"."+ext);
                f.setLevel(Integer.parseInt(fileLevel));
                f.setInfo("BIGFILE");
                f.setSize(Integer.parseInt(size));
                f.setExt(ext);
                f.setSlice(Integer.parseInt(slice));

                String[] extList = {"jpg", "jpeg", "gif", "bmp", "png",
                        "mkv", "avi", "mp4", "mpg", "flv", "wmv", "asf", "asx", "ogm", "ogv", "mov","m4k",
                        "wav", "AIFF", "AU", "FLAC", "MP3", "WMV", "ACC", "WMA"};

                for (int i = 0; i < extList.length; i++) {
                    if (ext.toLowerCase().contains(extList[i].toLowerCase())) {
                        f.setFileKinds("MEDIA");

                        if(i>=0 && i<=4){
                            f.setMediaType("IMG");
                        }else if(i>=5 && i<=17){
                            f.setMediaType("VIDEO");
                        }else if(i>=18 && i<=extList.length-1){
                            f.setMediaType("AUDIO");
                        }else{
                            f.setMediaType("ERROR");
                        }
                        break;
                    } else {
                        f.setFileKinds("ETC");
                    }
                }
                // 2. db 입력
                int fileNo = galleryMapper.insertBigFile(f);
                String[] imgList = {"jpg", "jpeg", "gif", "bmp", "png"};

                if(f.getFileKinds().equals("MEDIA") && f.getMediaType().equals("IMG")){
                    for (int i = 0; i < imgList.length; i++) {
                        if (f.getExt().contains(imgList[i])) {
                            //썸네일만들기
                            String thumbFilePath = FileUtil.imageResize(lOutFile, filePath, uploadDir, ext);

                            // 썸네일 디비저장
                            Files thumbnail = new Files();
                            thumbnail.setThumbPath(thumbFilePath);
                            thumbnail.setFileNo(f.getFileNo());
                            int thumbResult = galleryMapper.insertThumbnail(thumbnail);
                            break;
                        }
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException();
        } finally {

        }
        return 0;
    }

    /**
     * board 입력
     */
    @Override
    public int insertBoard(Board b) {
        int result = galleryMapper.insertBoard(b);
        int boardId = b.getbNo();
        return boardId;
    }


    /**
     * board list
     */
    @Override
    public List<Board> getBoardList(PageInfo pageInfo,SearchVO searchVO) {

        if(searchVO.getStrDate()!=null && searchVO.getStrDate().equals("")){
            searchVO.setStrDate(null);
            searchVO.setEndDate(null);
        }

        if(searchVO.getSearchCateId()!=null && searchVO.getSearchCateId().equals("")){
            searchVO.setSearchCateId(null);
        }

        if(searchVO.getSearchTagList()!=null && searchVO.getSearchTagList().size()==0){
            searchVO.setSearchTagList(null);
        }

        int listCount = galleryMapper.getBoardCount(searchVO);
        PageInfo pi = Pagination.getPageInfo(pageInfo.getCurrentPage(), listCount, pageInfo.getBoardLimit());
        Map<String,Object> paramMap = new HashMap<>();
        paramMap.put("searchVO",searchVO);
        paramMap.put("pi",pi);


        int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
        RowBounds rowBounds = new RowBounds(offset, pi.getBoardLimit());

        //List<Board> boardList = galleryMapper.getBoardList(rowBounds,searchVO);
        List<Board> boardList = galleryMapper.getBoardList(paramMap,rowBounds);

        for (int i = 0; i < boardList.size(); i++) {
            int bNo = boardList.get(i).getbNo();
            List<Files> filesList = galleryMapper.getFilesList(bNo);
            boardList.get(i).setFileList(filesList);
            boardList.get(i).setFileListLength(galleryMapper.getFilesCount(boardList.get(i).getbNo()));
        }


        return boardList;
    }

    @Override
    public int getTotalPage(SearchVO searchVO) {
        if(searchVO.getStrDate()!=null && searchVO.getStrDate().equals("")){
            searchVO.setStrDate(null);
            searchVO.setEndDate(null);
        }

        if(searchVO.getSearchCateId()!=null && searchVO.getSearchCateId().equals("")){
            searchVO.setSearchCateId(null);
        }

        if(searchVO.getSearchTagList()!=null && searchVO.getSearchTagList().size()==0){
            searchVO.setSearchTagList(null);
        }

        int listCount = galleryMapper.getBoardCount(searchVO);
        return listCount;
    }

    /***
     * ㄷㅣ테일
     * */
    @Override
    public Board getBoardDetail(int bNo) {
        Board b = galleryMapper.getBoardDetail(bNo);
        List<Files> fList = galleryMapper.getDetailFilesList(bNo);
        if(fList!=null && fList.size()!=0){
            b.setFileList(fList);
        }
        List<String> list = galleryMapper.getGalleryVOCate(b.getCateId());
        if(list.size()!=0){
            String temp = "";
            for(int i=1; i<list.size(); i++){
                if(i==list.size()-1){
                   temp+=list.get(i) ;
                }else{
                    temp+=list.get(i)+ " ＞ ";
                }
            }
            b.setCateList(temp);
        }
        return b;
    }

    /**
     * 파일정보를 가져온다.
     * */
    @Override
    public Files getFileInfo(Integer fileNo) {
        return galleryMapper.getFileInfo(fileNo);
    }


    /**
     * 태그 정보를 가져온다.
     *
     * @param bNo 게시글 아이디
     * @return List<TagVO>
     */
    @Override
    public List<Tag> getImgTagList(int bNo) {
        return galleryMapper.getImgTagList(bNo);
    }


    /**
     * 게시 정보를 삭제한다
     */
    @Override
    @Transactional
    public int deleteBoard(Integer bNo) throws Exception {

        // 태그 지우기
        galleryMapper.deleteTag(bNo);
        // 사진 지우기
        Board b = getBoardDetail(bNo);
        List<Files> fList = b.getFileList();
        for(int i=0; i<fList.size();i++){
            File f=  new File(fList.get(i).getRealPath());
            if(f.exists()){
                f.delete();
            }
        }

        // 게시 DB 지우기
        int result = galleryMapper.deleteBoard(bNo);
        //int result=0;
        if (result == 0) {
            throw new RuntimeException();
        }

        // 파일 db 지우기

        return result;
    }


}
