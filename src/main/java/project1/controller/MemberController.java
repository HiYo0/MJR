package project1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import project1.model.dto.MemberDto;
import project1.service.MemberService;

@Controller
@RequestMapping("/member")
public class MemberController {
    @Autowired
    MemberService memberService;

    // 1. 회원가입 처리 요청
    @PostMapping("/signup.do")
    @ResponseBody
    public boolean doPostSignup(MemberDto memberDto){
        return memberService.doPostSignup(memberDto);
    }

    // 2. 아이디 중복검사
    @GetMapping("/signup/idCheck")
    @ResponseBody
    public boolean doGetIdCheck(@RequestParam String mid){
        return memberService.doGetIdCheck(mid);
    }

    // ========== 페이지 요청 처리 ========== //
    // 1. 회원가입 페이지 요청
    @GetMapping("/signup")
    public String doGetSignup(){
        return "view/member/signup";
    }
}
