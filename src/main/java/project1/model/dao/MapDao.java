package project1.model.dao;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class MapDao extends Dao{
    // 업체 위도,경도 요청
    public List<Map<String , String >> doGetPosition(){
        List<Map<String,String>> list = new ArrayList<>();
        try {
            String sql="select * from store";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()){
                Map<String , String > map = new HashMap<>();
                map.put("slat",rs.getString("slat"));
                map.put("slng",rs.getString("slng"));

                list.add(map);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }
}
