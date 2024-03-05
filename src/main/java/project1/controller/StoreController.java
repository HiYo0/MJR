package project1.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StoreController {

    @GetMapping("/store/reg")
    public String viewReg(){
        System.out.println("StoreController.viewReg");
        return "/view/regStore";
    }





}
