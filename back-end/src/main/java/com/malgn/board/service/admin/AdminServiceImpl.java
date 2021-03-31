package com.malgn.board.service.admin;

import com.malgn.board.domain.common.PageInfo;
import com.malgn.board.domain.common.Pagination;
import com.malgn.board.domain.gallery.Category;
import com.malgn.board.domain.common.SearchVO;
import com.malgn.board.domain.gallery.Gallery;
import com.malgn.board.domain.member.Member;
import com.malgn.board.mapper.admin.AdminMapper;
import com.malgn.board.mapper.gallery.GalleryMapper;
import com.malgn.board.service.gallery.GalleryServiceImpl;
import org.apache.ibatis.session.RowBounds;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("aService")
public class AdminServiceImpl implements AdminService{

    private final PasswordEncoder passwordEncoder;
    private final AdminMapper aMapper;
    private final GalleryMapper galleryMapper;
    private final GalleryServiceImpl gSerivce;


    public AdminServiceImpl(PasswordEncoder passwordEncoder, AdminMapper aMapper,GalleryMapper galleryMapper, GalleryServiceImpl gSerivce) {
        this.passwordEncoder=passwordEncoder;
        this.aMapper = aMapper;
        this.galleryMapper=galleryMapper;
        this.gSerivce=gSerivce;
    }
    // ***************************************** 1. 유저 관리***************************************************
    /**
     * 신규 유저 등록
     * @param member 등록할 유저 정보
     * @throws Exception
     * @return int check
     */
    @Transactional
    @Override
    public int memberInsert(Member member) throws Exception{
        // id 중복 검사
        int idCheck = aMapper.idCheck(member.getId());
        if(idCheck!=0){
            throw new RuntimeException();
        }

        // 암호화
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        member.setPassword(passwordEncoder.encode(member.getPassword()));

        // 유저 등록
        int result = aMapper.memberInsert(member);

        // return값이 0일경우 등록 실패
        if(result==0){
            throw new RuntimeException();
        }

        return result;
    }

    /**
     * 회원 id로 회원 정보 가져오기
     * @param id 아이디 정보
     * */
    @Override
    public Member memberSelect(String id) {
        return aMapper.memberSelect(id);
    }

    /**
     * 회원 리스트
     * @param pageInfo 페이징 정보 searchVO 검색 정보
     * */
    @Override
    public List<Member> memberList(PageInfo pageInfo, SearchVO searchVO) {
        // 페이징을 위한 등록된 회원 수 갖고오기
        int listCount =  aMapper.getMemberCount(searchVO);
        PageInfo pi = Pagination.getPageInfo(pageInfo.getCurrentPage(), listCount, pageInfo.getBoardLimit());
        int offset = (pi.getCurrentPage() - 1) * pi.getBoardLimit();
        RowBounds rowBounds = new RowBounds(offset, pi.getBoardLimit());

        return aMapper.memberList(rowBounds, searchVO);
    }



    /**
     * 회원 정보 수정
     * - 회원 정보를 수정한다.
     * @param member 수정할 회원 정보
     * */
    @Override
    @Transactional
    public int memberUpdate(Member member) throws Exception{

        if("".equals(member.getPassword())){

        }

        if(member.getPassword()==null || member.getPassword().equals("")){
            Member selectMember = memberSelect(member.getId());
            member.setPassword(selectMember.getPassword());
        }else{
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            member.setPassword(passwordEncoder.encode(member.getPassword()));
        }

        int result = aMapper.memberUpdate(member);

        if (result == 0) {
            throw new RuntimeException();
        }

        return result;
    }

    /**
     * 회원 정보 삭제
     * - 회원 정보를 삭제한다.
     * @param id 수정할 회원의 id 정보
     * */
    @Override
    @Transactional
    public int memberDelete(String id) throws Exception{

        // 회원 정보 삭제 전에 태그 db 지우기
        SearchVO searchVO = new SearchVO();
        searchVO.setSearchCondition("id");
        searchVO.setSearchKeyword(id);

        Map<String,Object> paramMap = new HashMap<>();
        paramMap.put("searchVO",searchVO);
        List<Gallery> gList = galleryMapper.getImgList(paramMap);

        // 회원정보 삭제 전에 이미지 파일 지우기
//        for(int i=0; i<gList.size(); i++){
//            gSerivce.deleteImg(gList.get(i).getImgId());
//        }

        // 회원 정보 삭제 전에 이미지 db 지우기
        galleryMapper.allDeleteById(id);

        int result= aMapper.memberDelete(id);
        if(result==0){
            throw new RuntimeException();
        }
        return result;
    }

    /**
     * 카테고리 등록
     * - 카테고리를 새로 등록한다.
     * @param category 등록할 카테고리 정보
     * */
    @Override
    @Transactional
    public int postCate(Category category)  throws Exception {
        // level을 알아온다
//        if(category.getCatePId()!=0){
//            Category pCateInfo = aMapper.categoryInfo(category.getCatePId());
//            category.setCateLevel(pCateInfo.getCateLevel()+1);
//        }else{
//            //최상위카테고리일때?
//            category.setCateLevel(1);
//        }

        int result = aMapper.postCate(category);

        if(result<0){
            throw new RuntimeException();
        }
        return result;
    }

    // ***************************************** 2. 카테고리 관리***************************************************
    // 카테고리 리스트는 GalleryService를 참조

    /**
     * 카테고리 이름 수정
     * - 카테고리 이름을 수정한다.
     * @param data 수정할 카테고리 정보
     * */
    @Override
    @Transactional
    public int cateUpdate(List<Map<String,Object>> data) throws Exception {
        // 순서 reset
        aMapper.cateSeqReset(data);
        int result = aMapper.cateUpdate(data);
        return result;
    }

    /**
     * 카테고리 제목 수정
     * - 카테고리의 제목을 수정한다.
     * @param category 수정할 카테고리 정보
     * */
    @Override
    public int cateTitleUpdate(Category category) throws Exception{
        int result =aMapper.cateTitleUpdate(category);
        if(result<0){
            throw new RuntimeException();
        }
        return result;
    }

    @Override
    public Member read(int userNo) {
        return aMapper.read(userNo);
    }

    /**
     * 카테고리 삭제
     * - 카테고리를 삭제한다.
     * @param cateId 카테고리 id
     * */
    @Override
    @Transactional
    public int deleteCategory(int cateId) throws Exception {
        // 카테고리 지우기
        int result = aMapper.deleteCategory(cateId);
        if(result<0){
            throw new RuntimeException();
        }
        return result;
    }



}
