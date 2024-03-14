package project1.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import project1.model.dto.BoardDto;
import project1.model.dto.CouponDto;
import project1.model.dto.MemberDto;
import project1.model.dto.ReplyDto;
import project1.service.MemberService;

import java.util.List;
import java.util.Map;

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

        String mid = (String) request.getSession().getAttribute("logininfo");

        MemberDto memberDto = memberService.doGetLoginInfo(mid);

        if(memberDto.getMstate() == 2){
            return false;
        }else{
            return result;
        }
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

    // 세션 정보 가져오기
    @GetMapping("/mypage/getsessioninfo")
    @ResponseBody
    public MemberDto doGetSessionInfo(){
        String mid = (String) request.getSession().getAttribute("logininfo");
        return memberService.doGetLoginInfo(mid);
    }

    // 7. 내정보
    @GetMapping("/mypage/myinfo")
    @ResponseBody
    public MemberDto doGetMyInfo(@RequestParam int mno){
        System.out.println("MemberController.doGetMyInfo");
        String mid = (String) request.getSession().getAttribute("logininfo");
        MemberDto admin = memberService.doGetLoginInfo(mid);

        MemberDto result = memberService.doGetMyInfo(mno);
        if (!mid.isEmpty()){ // id가 있을떄
            if(mid.equals(result.getMid()) || 3 == admin.getMstate()){ // 그 아이디가 지금 페이지랑 같지 않고 , 관리자가 아닐때 null
                return result;
            }else{
                return null;
            }
        }else{
            return null;
        }
    }
    
    // 8. 회원정보 변경
    @PostMapping("/mypage/updateinfo")
    @ResponseBody
    public boolean doPostUpdateInfo(MemberDto memberDto){
        System.out.println("MemberController.doPostUpdateInfo");
        System.out.println("memberDto = " + memberDto);
        return memberService.doPostUpdateInfo(memberDto);
    }

    // 9. 내가 쓴 글 출력
    @GetMapping("/mypage/boardlist")
    @ResponseBody
    public List<BoardDto> doGetBoardList(@RequestParam int mno){
        return memberService.doGetBoardList(mno);
    }

    // 10. 내가 쓴 댓글 출력
    @GetMapping("/mypage/replylist")
    @ResponseBody
    public List<ReplyDto> doGetReplyList(@RequestParam int mno){
        return memberService.doGetReplyList(mno);
    }

    // 10. 내 쿠폰
    @GetMapping("/mypage/mycoupon")
    @ResponseBody
    public List<CouponDto> doGetMyCoupon(@RequestParam int mno){
        return memberService.doGetMyCoupon(mno);
    }

    // 11. 즐겨찾기
    @GetMapping("/mypage/favorites")
    @ResponseBody
    public boolean doGetFavorites(){
        return true;
    }

    // 12. 회원 탈퇴
    @GetMapping("/mypage/memberdelete")
    @ResponseBody
    public boolean doGetMemberDelete(@RequestParam String mpw){
        return memberService.doGetMemberDelete(mpw);
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
