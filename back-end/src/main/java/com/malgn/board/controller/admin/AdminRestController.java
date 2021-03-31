package com.malgn.board.controller.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.malgn.board.domain.common.RestResponse;
import com.malgn.board.domain.gallery.Category;
import com.malgn.board.domain.member.Member;
import com.malgn.board.service.admin.AdminService;
import org.json.JSONArray;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RequestMapping("/admin")
@RestController
public class AdminRestController {

    private final AdminService aService;
    private RestResponse restResponse;

    public AdminRestController(AdminService aService,RestResponse restResponse) {
        this.aService = aService;
        this.restResponse=restResponse;
    }

    private static final Logger log = LoggerFactory.getLogger(AdminRestController.class);

    // ***************************************** 1. 유저 관리***************************************************
    /**
     ** 1.1 회원 등록 [post]
     * @param member id 아이디, name 이름, email 이메일, password 패스워드, type 멤버타입
     */
    @PostMapping(path = "/member")
    public RestResponse<Integer> postMember(Member member) throws Exception {
        int result = aService.memberInsert(member);
        return restResponse.success(result);
    }
    /**
     ** 1.2 회원 수정 [put]
     * @param member id 아이디, name 이름, email 이메일, password 패스워드
     */
    @PutMapping(path="/member/{id}")
    public RestResponse<Integer> updateMember(@PathVariable String id, Member member) throws Exception {
        int result = aService.memberUpdate(member);
        return restResponse.success(result);
    }

    // 3. 회원 정보 삭제
    @DeleteMapping(path="/member/{id}")
    public RestResponse<Integer> deleteMember(@PathVariable("id")String id) throws Exception  {
        int result = aService.memberDelete(id);
        return restResponse.success(result);
    }


    // ***************************************** 2. 카테고리 관리***************************************************

    //Category{cateId=0, cateName='하위카테고리2', catePId=31, cateSeq=0, cateLevel=0, children=null, cateCount=0}
    /**
     * 2.1 카테고리 등록
     * @param category cateName 카테고리 이름, catePId 부모 카테고리 id
     *  */
    @PostMapping(path = "/cate")
    public RestResponse<Integer> postCate(Category category)  throws Exception  {
        int result = aService.postCate(category);
        return restResponse.success(result);
    }


    /** 2.2 카테고리 순서수정
     * 카테고리 순서를 수정함
     */
    @PutMapping(path="/cate/seq/{data}")
    public RestResponse<Integer> cateSeqpdate(@PathVariable JSONArray data)  throws Exception  {
        List<Map<String,Object>> list = new ArrayList<>();
        list = new ObjectMapper().readValue(data.toString(), List.class) ;
        int result = aService.cateUpdate(list);
        return restResponse.success(result);
    }

    /** 2.3 카테고리 제목 수정
     * 카테고리 제목을 수정함
     */
    @PutMapping(path="/cate/title/{cateId}")
    public RestResponse<Integer> cateTitleUpdate(@PathVariable int cateId, Category category)  throws Exception {
        int result = aService.cateTitleUpdate(category);
        return restResponse.success(result);
    }

    /**
     ** 2.4 카테고리 삭제
     * 카테고리 정보를 삭제함
     * @param cateId 카테고리 ID
     */
    @DeleteMapping(path="/cate/{cateId}")
    public RestResponse<Integer> deleteCategory(@PathVariable Integer cateId) throws Exception  {
        int result = aService.deleteCategory(cateId);
        return restResponse.success(result);
    }
}
