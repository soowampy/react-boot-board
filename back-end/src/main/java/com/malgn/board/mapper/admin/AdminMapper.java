package com.malgn.board.mapper.admin;

import com.malgn.board.domain.gallery.Category;
import com.malgn.board.domain.common.SearchVO;
import com.malgn.board.domain.member.Member;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
public interface AdminMapper {
    int memberInsert(Member member);

    int idCheck(String id);

    List<Member> memberList(RowBounds rowBounds,SearchVO searchVO);

    int getMemberCount(SearchVO searchVO);

    Member memberSelect(String id);

    int memberUpdate(Member member);

    int memberDelete(String id);

    int cateUpdate(List<Map<String,Object>> updList);

    int postCate(Category category);

    int deleteCategory(int cateId);

    Category categoryInfo(int cateId);

    void cateSeqReset(List<Map<String, Object>> data);

    int cateTitleUpdate(Category category);

    Member read(int userNo);
}
