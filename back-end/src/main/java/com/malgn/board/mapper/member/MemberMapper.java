package com.malgn.board.mapper.member;

import com.malgn.board.domain.member.Member;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
public interface MemberMapper {
    // id로 유저 정보 갖고오기
    Member getFindById(String id);

    // 멤버 정보 넣기 (미구현)
    void insertMember(Member member);


}
