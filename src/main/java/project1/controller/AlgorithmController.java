package project1.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import project1.model.dto.MemberDto;
import project1.model.dto.StoreDto;
import project1.service.AlgorithmService;
import project1.service.MemberService;

import java.util.List;

@Controller
@RequestMapping("/algorithm")
public class AlgorithmController {
    @Autowired
    AlgorithmService algorithmService;
    @Autowired
    MemberService memberService;
    @Autowired
    HttpServletRequest request;

    @GetMapping("/findmember")
    public List<StoreDto> doGetFindMember(){
//        String mid = (String) request.getSession().getAttribute("logininfo");
//        memberService.doGetLoginInfo(mid).getMno();
        int mno = 10;
        algorithmService.doGetFindMember(mno);
        return null;
    }
}
