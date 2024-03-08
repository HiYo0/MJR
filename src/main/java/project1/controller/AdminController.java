package project1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dto.MemberDto;
import project1.service.AdminService;

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping("") // 회원 목록 전체 출력(첫 페이지)
    public String adminPage(){
        return "/view/admin/admin";
    }

    @GetMapping("/mmview")
    @ResponseBody
    public List<MemberDto> adminMview(){
        System.out.println("AdminController.adminMview");
        return adminService.adminMview();
    }

}
