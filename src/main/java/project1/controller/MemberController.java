package project1.controller;

import jakarta.servlet.http.HttpServletRequest;
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
    @Autowired
    HttpServletRequest request;

    // 1. 회원가입 처리 요청
    @PostMapping("/signup.do")
    @ResponseBody
    public boolean doPostSignup(MemberDto memberDto){
        System.out.println("MemberController.doPostSignup");
        return memberService.doPostSignup(memberDto);
    }

    // 2. 아이디 중복검사
    @GetMapping("/signup/idCheck")
    @ResponseBody
    public boolean doGetIdCheck(@RequestParam String mid){
        System.out.println("MemberController.doGetIdCheck");
        return memberService.doGetIdCheck(mid);
    }

    // 3. 로그인 처리 요청
    @PostMapping("/login.do")
    @ResponseBody
    public boolean doPostLogin(@RequestParam String loginId , @RequestParam String loginPw){
        System.out.println("MemberController.doPostLogin");
        boolean result = memberService.doPostLogin(loginId,loginPw);
        if(result){
            request.getSession().setAttribute("logininfo",loginId);
        }
        return result;
    }

    // 4. 로그인 여부 확인 요청
    @GetMapping("/login/check.do")
    @ResponseBody
    public String doGetLoginCheck(){
        System.out.println("MemberController.doGetLoginCheck");

        String loginDto = null;
        Object sessionObj = request.getSession().getAttribute("logininfo");
        if (sessionObj != null){
            loginDto = (String)sessionObj;
        }

        System.out.println(loginDto);

        return loginDto;
    }

    // 5. 회원 정보 요청
    @GetMapping("/login/info.do")
    @ResponseBody
    public MemberDto doGetLoginInfo(@RequestParam String mid){
        System.out.println("MemberController.doGetLoginInfo");
        return memberService.doGetLoginInfo(mid);
    }

    // 6. 로그아웃 처리 요청
    @GetMapping("/logout.do")
    @ResponseBody
    public boolean logout(){
        System.out.println("MemberController.logout");

        request.getSession().invalidate();
        return true;
    }

    // ========== 페이지 요청 처리 ========== //
    // 1. 회원가입 페이지 요청
    @GetMapping("/signup")
    public String doGetSignup(){
        return "view/member/signup";
    }

    // 2. 로그인 페이지 요청
    @GetMapping("/login")
    public String doGetLogin(){
        return "view/member/login";
    }

    // 3. 내정보 페이지 요청
    @GetMapping("/mypage")
    public String doGetInfo(){
        return "view/member/mypage";
    }
}
