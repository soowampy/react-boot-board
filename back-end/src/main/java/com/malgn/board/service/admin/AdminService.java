package com.malgn.board.service.admin;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.malgn.board.domain.common.PageInfo;
import com.malgn.board.domain.gallery.Category;
import com.malgn.board.domain.common.SearchVO;
import com.malgn.board.domain.member.Member;

import java.util.List;
import java.util.Map;

public interface AdminService {

    // 멤버 신규 등록
    int memberInsert(Member member) throws Exception;

    // 회원 리스트
    List<Member> memberList(PageInfo pageInfo, SearchVO searchVO);

    // 회원 아이디로 회원 정보 가져오기
    Member memberSelect(String id);

    // 회원 정보 수정
    int memberUpdate(Member member) throws Exception;

    // 회원 정보 삭제
    int memberDelete(String id) throws Exception;

    // 카테고리 순서 수정
    int cateUpdate(List<Map<String,Object>> data) throws Exception;
    
    // 카테고리 등록
    int postCate(Category category) throws Exception;

    // 카테고리 삭제
    int deleteCategory(int cateId) throws Exception;
    
    // 카테고리 이름 변경
    int cateTitleUpdate(Category category) throws Exception;

    Member read(int userNo);
}
