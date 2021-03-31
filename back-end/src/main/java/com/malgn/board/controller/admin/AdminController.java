package com.malgn.board.controller.admin;

import com.malgn.board.domain.common.PageInfo;
import com.malgn.board.domain.common.Pagination;
import com.malgn.board.domain.gallery.Category;
import com.malgn.board.domain.common.SearchVO;
import com.malgn.board.domain.member.Member;
import com.malgn.board.service.admin.AdminService;
import com.malgn.board.service.gallery.GalleryService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/admin")
@Controller
public class AdminController {

    private final AdminService aService;
    private final GalleryService gService;

    public AdminController(AdminService aService, GalleryService gService) {
        this.gService = gService;
        this.aService = aService;
    }


    // 카테고리 리스트 이동
    @GetMapping(path = "/cate/list")
    public String cateList(Model model){
        // 기존의 카테고리 목록 갖고오기
        List<Category> list = gService.getCateList();
        model.addAttribute("cateList",list);
        model.addAttribute("cate","cate");
        return "/admin/categorylist";
    }

    // 카테고리 등록폼 이동
    @GetMapping(path = "/cate/insert")
    public String cateInsert(Model model){
        model.addAttribute("cate","cate");
        return "/admin/categoryform";
    }

    // 카테고리 수정폼 이동
    @GetMapping(path = "/cate/update")
    public String cateUpdate(Model model){
        model.addAttribute("cate","cate");
        return "/admin/categoryform";
    }


    // 회원 리스트 이동
    @GetMapping(path = "/member/list")
    public String memberList(Model model, Integer page, SearchVO searchVO){
        if(page ==null){
            page = 1;
        }
        PageInfo pageInfo = new PageInfo(page, 10);

        List<Member> mList = aService.memberList(pageInfo,searchVO);

        if(mList.size()==0){
            model.addAttribute("memberempty","memberempty");
        }

        model.addAttribute("searchCondition",searchVO.getSearchCondition());
        model.addAttribute("search",searchVO.getSearchKeyword());
        model.addAttribute("mList",mList);
        model.addAttribute("member","member");
        model.addAttribute("pi", Pagination.getPageInfo());

        if(Pagination.getPageInfo().getCurrentPage()!=1){
            model.addAttribute("prePage","?page="+(Pagination.getPageInfo().getCurrentPage()-1));
        }else{
            model.addAttribute("nextPage","?page=1");
        }
        if(Pagination.getPageInfo().getCurrentPage()!=Pagination.getPageInfo().getEndPage()){
            model.addAttribute("nextPage","?page="+(Pagination.getPageInfo().getCurrentPage()+1));
        }else{
            model.addAttribute("nextPage","?page="+Pagination.getPageInfo().getEndPage());
        }




        return "/admin/memberlist";
    }

    // 회원 등록폼 이동
    @GetMapping(path = "/member/insertForm")
    public String memberInsert(Model model){
        model.addAttribute("memberInsert","memberInsert");
        return "/admin/memberRegForm";
    }

    // 회원 수정폼 이동
    @GetMapping(path = "/member/updateForm")
    public String memberUpdate(Model model, String id){
        // 회원 정보 가져오기
        Member m = aService.memberSelect(id);
        model.addAttribute("m",m);
        model.addAttribute("member","member");
        return "/admin/memberUpdform";
    }

}
