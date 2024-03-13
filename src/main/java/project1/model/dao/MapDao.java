package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.StoreDto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class MapDao extends Dao{
    // 업체 위도,경도 요청
    public List<StoreDto> doGetPosition(){
        List<StoreDto> list = new ArrayList<>();
        try {
            String sql="select * from store";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()){
                StoreDto storeDto = StoreDto.builder()
                        .sno(rs.getLong("sno"))
                        .sname(rs.getString("sname"))
                        .sphone(rs.getString("sphone"))
                        .sadress(rs.getString("sadress"))
                        .scontent(rs.getString("scontent"))
                        .sstate(rs.getInt("sstate"))
                        .slat(rs.getString("slat"))
                        .slng(rs.getString("slng"))
                        .sfile1(rs.getString("simg1"))
                        .build();

                list.add(storeDto);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }
}
