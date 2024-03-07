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

    // 1. 회원가입 처리 요청
    public boolean doPostSignup(MemberDto memberDto){
        return memberDao.doPostSignup(memberDto);
    }

    // 2. 아이디 중복검사
    public boolean doGetIdCheck(String mid){
        return memberDao.doGetIdCheck(mid);
    }
}
