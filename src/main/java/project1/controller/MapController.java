package project1.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dto.StoreDto;
import project1.service.MapService;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/map")
public class MapController {
    @Autowired
    private MapService mapService;

    // 지도 페이지 요청
    @GetMapping("")
    public String getMap(){
        return "view/map";
    }

    // 업체 정보 요청
    @GetMapping("/storeinfo.do")
    @ResponseBody
    public List<StoreDto> doGetPosition(){
        return mapService.doGetPosition();
    }
}
