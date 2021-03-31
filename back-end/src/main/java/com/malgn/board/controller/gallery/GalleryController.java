package com.malgn.board.controller.gallery;

import com.malgn.board.domain.common.PageInfo;
import com.malgn.board.domain.common.SearchVO;
import com.malgn.board.domain.gallery.Gallery;
import com.malgn.board.domain.member.Member;
import com.malgn.board.service.gallery.GalleryService;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.nio.file.Files;
import java.util.List;

@RequestMapping("/gallery")
@Controller
public class GalleryController {
    private final GalleryService gService;
    public GalleryController(GalleryService gService){
        this.gService=gService;
    }

    // 갤러 리스트로 이동
    @GetMapping(path = "/list")
    public String list(Model model, String page, String type, SearchVO searchVO){

        if(type==null){
            model.addAttribute("allList","allList");
        }else if(type.equals("allList")){
            model.addAttribute("allList","allList");
        }else{
            model.addAttribute("search","search");
        }

        String tagList="";
        if(searchVO.getSearchTagList()!=null){
            for(int i=0; i<searchVO.getSearchTagList().size(); i++){
                if(i!=searchVO.getSearchTagList().size()-1){
                    tagList += searchVO.getSearchTagList().get(i)+",";
                }else{
                    tagList += searchVO.getSearchTagList().get(i);
                }
            }
        }


        model.addAttribute("searchCondition",searchVO.getSearchCondition());
        model.addAttribute("searchKeyword",searchVO.getSearchKeyword());
        model.addAttribute("searchTagId",searchVO.getSearchTagId());
        model.addAttribute("searchTagList",tagList);
        model.addAttribute("searchCateId",searchVO.getSearchCateId());
        model.addAttribute("strDate",searchVO.getStrDate());
        model.addAttribute("endDate",searchVO.getEndDate());

        model.addAttribute("gallery","gallery");
        return "gallery/list";
    }

    // 갤러리 등록  폼으로 이동
    @GetMapping(path = "/form")
    public String form(Model model){
        model.addAttribute("gForm","gForm");
        return "gallery/regForm";
    }

    // 상세보기 폼으로 이동
    @GetMapping(path = "/details")
    public String details(int imgId, Model model, Authentication auth, SearchVO searchVO){
        Gallery gallery = gService.getGalleryVO(imgId);

        Member nowUser= (Member)auth.getPrincipal();

        // 시글을 삭제할 수 있는 권한여부를 입력함 (delAuth)
        // 운영자 권한일 경우 모든 게시글 삭제 가능
            if(nowUser.getType().equals("ROLE_ADMIN") || nowUser.getId().equals(gallery.getmId())){
                model.addAttribute("del", "del");
            }

        model.addAttribute("gVO", gallery);
        model.addAttribute("gallery","gallery");

        String tagList="";
        if(searchVO.getSearchTagList()!=null){
            for(int i=0; i<searchVO.getSearchTagList().size(); i++){
                if(i!=searchVO.getSearchTagList().size()-1){
                    tagList += searchVO.getSearchTagList().get(i)+",";
                }else{
                    tagList += searchVO.getSearchTagList().get(i);
                }
            }
        }

        model.addAttribute("searchCondition",searchVO.getSearchCondition());
        model.addAttribute("searchKeyword",searchVO.getSearchKeyword());
        model.addAttribute("searchTagId",searchVO.getSearchTagId());
        model.addAttribute("searchTagList",tagList);
        model.addAttribute("searchCateId",searchVO.getSearchCateId());
        model.addAttribute("strDate",searchVO.getStrDate());
        model.addAttribute("endDate",searchVO.getEndDate());



        return "gallery/details";
    }

    // 수정 폼으로 이동
    @GetMapping(path = "/update")
    public String update(int imgId, Model model){
        Gallery gallery = gService.getGalleryVO(imgId);
        model.addAttribute("gVO", gallery);
        model.addAttribute("gForm","gForm");
        return "gallery/updForm";
    }
}
