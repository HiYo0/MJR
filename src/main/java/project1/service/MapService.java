package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dao.MapDao;

import java.util.List;
import java.util.Map;

@Service
public class MapService {
    @Autowired
    private MapDao mapDao;

    // 업체 위도,경도 요청
    public List<Map<String , String >> doGetPosition(){
        return mapDao.doGetPosition();
    }
}
