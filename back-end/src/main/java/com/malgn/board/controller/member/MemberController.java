package com.malgn.board.controller.member;

import com.malgn.board.domain.member.Member;
import com.malgn.board.service.admin.AdminService;
import com.malgn.board.service.member.MemberService;
import com.malgn.board.util.AuthUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class MemberController {

    private final MemberService memberService;
    private final AdminService aService;

    public MemberController(MemberService memberService,AdminService aService){
        this.memberService=memberService;
        this.aService = aService;
    }

    // 로그인 화면 이동
    @GetMapping(path = "/loginView")
    public String loginView(HttpServletRequest request, HttpSession session, Model model){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String errormsg = (String) session.getAttribute("errormsg");
        String inputId = (String) session.getAttribute("inputId");
        String expire = (String)request.getParameter("expire");

        model.addAttribute("errormsg", errormsg);
        model.addAttribute("inputId", inputId);

        if(expire!=null){
            model.addAttribute("logout", "다른 브라우저에서 로그인 시도가 있어 로그아웃 되었습니다.");
        }

        if(auth.getPrincipal().equals("anonymousUser")){
            // 로그인 화면으로 이동
            return "home/login";
        }else{
            // 로그인 상태 시 메인화면(갤러리 리스트)로 이동
            return "redirect:/gallery/list";
        }
    }

    @GetMapping(path= "/mypage")
    public String mypage(Model model,Authentication auth){
        Member nowUser= (Member)auth.getPrincipal();
        Member m = aService.memberSelect(nowUser.getId());

        model.addAttribute("m",m);
        return "user/myPage";
    }

    // 비밀번호 찾기
    @GetMapping(path= "/findPw")
    public String findView(){
        return "home/findPw";
    }

    @GetMapping(path = "/imglistcustom")
    public String custom(){
        return "custom/imgList";
    }



    @GetMapping(path = "api/users/myinfo")
    public ResponseEntity<Member> getMyInfo(@RequestHeader (name="Authorization") String header) throws Exception{

        int userNo = AuthUtil.getUserNo(header);
        Member member = aService.read(userNo);
        member.setPassword("");
        return new ResponseEntity<>(member, HttpStatus.OK);
    }
}
