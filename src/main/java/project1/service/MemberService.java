package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dao.MemberDao;

@Service
public class MemberService {
    @Autowired
    MemberDao memberDao;

    // 1. 회원가입 처리 요청
    public boolean doPostSignup(){
        return memberDao.doPostSignup();
    }
}
