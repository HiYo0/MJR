package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dao.MemberDao;
import project1.model.dto.MemberDto;

@Service
public class MemberService {
    @Autowired
    MemberDao memberDao;
    @Autowired
    FileService fileService;

    // 1. 회원가입 처리 요청
    public boolean doPostSignup(MemberDto memberDto){
        System.out.println("MemberService.doPostSignup");

        memberDto.setMbirth(memberDto.getYy()+memberDto.getMm()+memberDto.getDd());

        String fileName = "default.jpg";

        if(!memberDto.getProfileimg().isEmpty()){
            fileName = fileService.fileUpload(memberDto.getProfileimg());
            if (fileName == null){
                return false;
            }
        }
        memberDto.setMimg(fileName);

        return memberDao.doPostSignup(memberDto);
    }

    // 2. 아이디 중복검사
    public boolean doGetIdCheck(String mid){
        System.out.println("MemberService.doGetIdCheck");
        return memberDao.doGetIdCheck(mid);
    }

    // 3. 로그인 처리 요청
    public boolean doPostLogin(String loginId ,String loginPw){
        System.out.println("MemberService.doPostLogin");
        return memberDao.doPostLogin(loginId,loginPw);
    }

    // 4. 회원 정보 요청
    public MemberDto doGetLoginInfo(String mid){
        System.out.println("MemberService.doGetLoginInfo");
        return memberDao.doGetLoginInfo(mid);
    }
}
