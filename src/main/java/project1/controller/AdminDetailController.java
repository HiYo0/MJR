package project1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/adminDetailPage")
public class AdminDetailController {

    @GetMapping("")
    public String adminDetailPage(@RequestParam String detail){
        return "/view/admin/adminDetailPage";
    }


}
