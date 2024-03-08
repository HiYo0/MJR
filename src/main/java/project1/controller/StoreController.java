package project1.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.catalina.Store;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import project1.model.dao.StoreDao;
import project1.model.dto.StoreDto;
import project1.model.dto.StorePageDto;
import project1.service.StoreService;

@Controller
@RequestMapping("/store")
public class StoreController {

    @Autowired
    private StoreDao storeDao;
    //세션 불러오기
    @Autowired
    private HttpServletRequest request;

    @Autowired
    private StoreService storeService;

    //-------------------------------------------//

    //1. 가게 등록 처리
    @PostMapping("/reg.do")
    @ResponseBody
    public long doPostStoreReg(StoreDto storeDto){
        System.out.println("StoreController.doPostStoreReg");
        //1. 현재 로그인된 세션 호출
        //Object object=request.getSession().getAttribute("LoginDto");
        //if(object==null) return -2;
        //2. 형 변환
        //String mid = (String) object;
        //3. mid로 mno 가져오기
        //long mno = memberServie
        //4. 가입자 번호 대입
        storeDto.setMno(1);
        return storeService.doPostStoreReg(storeDto);
    }

    //2. 전체글 출력 호출
    @GetMapping("/do")
    @ResponseBody
    public StorePageDto doGetStoreList(@RequestParam int page, @RequestParam int pageStoreSize,
                                       @RequestParam int categorya,@RequestParam int categoryb,
                                       @RequestParam String key, @RequestParam String keyword){
        System.out.println("StoreController.doGetStoreList");
        return storeService.doGetStoreList(page, pageStoreSize, categorya, categoryb, key, keyword) ;
    }


















   //--------------------페이지 이동-------------------------//


    //1. 가게등록 페이지로 이동
    @GetMapping("/reg")
    public String viewReg(){
        System.out.println("StoreController.viewReg");
        return "/view/store/regStore";
    }
    //2. 가게 전체 출력 페이지로 이동
    @GetMapping("/view")
    public String viewStore(){
        System.out.println("StoreController.viewStore");
        return "/view/store/store";
    }






}
