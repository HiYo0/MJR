package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.StoreDto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class MapDao extends Dao{
    // 업체 정보 요청
    public List<StoreDto> doGetPosition(String east , String west , String south , String north){
        System.out.println("east = " + east);
        System.out.println("west = " + west);
        System.out.println("south = " + south);
        System.out.println("north = " + north);
        List<StoreDto> list = new ArrayList<>();
        try {
            String sql="select * from store where ? >= slng and ? <= slng and ? <= slat and ? >= slat ";
            ps = conn.prepareStatement(sql);
            ps.setString(1,east);
            ps.setString(2,west);
            ps.setString(3,south);
            ps.setString(4,north);
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

    // 전승호 ==============================================================
    // 검색 기능 ( 입력값 받아와서 입력값에 해당하는 주소정보 꺼내옴 )
    public List<StoreDto> doGetSearch(String keyword){
        System.out.println("MapDao.doGetSearch");
        List<StoreDto> list = new ArrayList<>();
        try {
            String sql = "select * from store s inner join member m on s.mno=m.mno " +
                    "where sadress like '%"+keyword+"%' or sname like '%"+keyword+"%'";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()){
                // 가게 정보 객체화
                StoreDto storeDto = new StoreDto();
                storeDto.setSno(rs.getLong("sno"));
                storeDto.setSname(rs.getString("sname"));
                storeDto.setSphone(rs.getString("sphone"));
                storeDto.setSfile1(rs.getString("simg1"));
                storeDto.setSfile2(rs.getString("simg2"));
                storeDto.setSfile3(rs.getString("simg3"));
                storeDto.setSfile4(rs.getString("simg4"));
                storeDto.setSadress(rs.getString("sadress"));
                storeDto.setScontent(rs.getString("scontent"));
                storeDto.setSstate(rs.getInt("sstate"));
                storeDto.setSnumber(rs.getString("snumber"));
                storeDto.setCategorya(rs.getInt("categorya"));
                storeDto.setCategoryb(rs.getInt("categoryb"));
                storeDto.setSlat(rs.getString("slat"));
                storeDto.setSlng(rs.getString("slng"));
                storeDto.setMno(rs.getLong("mno"));
                storeDto.setMid(rs.getString("mid"));
                // 리스트에 가게정보 담기
                list.add(storeDto);
            }
        }catch (Exception e){System.out.println("e = " + e);}

        return list;
    }
    // 전승호 END ==========================================================
}
