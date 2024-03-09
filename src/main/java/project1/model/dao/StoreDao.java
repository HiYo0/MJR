package project1.model.dao;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dto.StoreDto;

import java.util.ArrayList;
import java.util.List;

@Component
public class StoreDao extends Dao {
    public long doPostStoreReg(StoreDto storeDto) {
        System.out.println("StoreDao.doPostStoreReg");
        System.out.println("storeDto = " + storeDto);
        try {
            String sql =
                    "insert into store(sname,sphone,simg1,simg2,simg3,simg4,sadress,scontent,snumber,categorya,categoryb,mno) " +
                            " value(?,?,?,?,?,?,?,?,?,?,?,?)";
            ps = conn.prepareStatement(sql);
            ps.setString(1, storeDto.getSname());
            ps.setString(2, storeDto.getSphone());
            ps.setString(3, storeDto.getSfile1());
            ps.setString(4, storeDto.getSfile2());
            ps.setString(5, storeDto.getSfile3());
            ps.setString(6, storeDto.getSfile4());
            ps.setString(7, storeDto.getSadress());
            ps.setString(8, storeDto.getScontent());
            ps.setString(9, storeDto.getSnumber());
            ps.setInt(10, storeDto.getCategorya());
            ps.setInt(11, storeDto.getCategoryb());
            ps.setLong(12, storeDto.getMno());
            int count = ps.executeUpdate();
            if (count == 1) {
                System.out.println("등록성공");
                return 1;
            }

        } catch (Exception e) {
            System.out.println("e = " + e);
        }
        return 0;
    }

    //2. 가게 전체 출력
    public List<StoreDto> dogetStoreViewList(int startrow, int pageStoreSize, int categorya, int categoryb, String key, String keyword) {
        System.out.println("StoreController.doGetStoreList");
        StoreDto storeDto = null;
        List<StoreDto> list = new ArrayList<>();
        try {
            String sql = "select * from store " ;
            //================1. 만약에 카테고리 조건이 있으면 where 추가.
            if(categorya==1){
                if(categoryb>0){sql+=" where categoryb ="+categoryb;}
            }else if(categorya>1){
                sql+=" where categorya ="+categorya;
                if(categoryb>0){sql+=" and categoryb ="+categoryb;}
            }
            //================2. 만약에 검색 있을때
            if(!keyword.isEmpty()){   System.out.println("검색 키워드가 존재");
                if(categorya!=1|| categoryb!=0){sql+=" and ";}   // 카테고리가 있을 때, and 로 연결
                else{sql += " where ";}       // 카테고리가 없을 때, where 로 연결
                sql+= key+" like '%"+keyword+"%' ";
            }

            sql+=" limit ? ,?";



            ps=conn.prepareStatement(sql);
            ps.setInt(1,startrow);
            ps.setInt(2,pageStoreSize);
            rs=ps.executeQuery();
            while(rs.next()){
                storeDto=  StoreDto.builder()
                        .sno(rs.getLong("sno"))
                        .sname(rs.getString("sname"))
                        .sphone(rs.getString("sphone"))
                        .sadress( rs.getString("sadress"))
                        .scontent( rs.getString("scontent"))
                        .sstate( rs.getInt("sstate"))
                        .snumber( rs.getString("snumber"))
                        .categorya( rs.getInt("categorya"))
                        .categoryb( rs.getInt("categoryb"))
                        .sfile1( rs.getString("simg1"))
                        .sfile2( rs.getString("simg2"))
                        .sfile3( rs.getString("simg3"))
                        .sfile4( rs.getString("simg4"))
                        .mno(rs.getLong("mno"))
                                .build();

                        list.add(storeDto);
                System.out.println("sql = " + sql);
                System.out.println("list = " + list);
            }

        } catch (Exception e) {
            System.out.println("e = " + e);
        }

        return list;
    }

    //2-2. 전체 게시물 수 호출
    public int getStoreSize(int categorya, int categoryb, String key, String keyword) {
        System.out.println("categorya = " + categorya + ", categoryb = " + categoryb + ", key = " + key + ", keyword = " + keyword);
        try{
            String sql = "select count(*) from store ";

            //================1. 만약에 카테고리 조건이 있으면 where 추가.
            if(categorya==1){
                if(categoryb>0){sql+=" where categoryb ="+categoryb;}
            }else if(categorya>1){
                sql+=" where categorya ="+categorya;
                if(categoryb>0){sql+=" and categoryb ="+categoryb;}
            }
            //================2. 만약에 검색 있을때
            if(!keyword.isEmpty()){   System.out.println("검색 키워드가 존재");
                if(categorya!=1|| categoryb!=0){sql+=" and ";}   // 카테고리가 있을 때, and 로 연결
                else{sql += " where ";}       // 카테고리가 없을 때, where 로 연결
                sql+= key+" like '%"+keyword+"%' ";
            }

            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            if( rs.next() ){ return rs.getInt(1); }
        }catch (Exception e ){  System.out.println("e = " + e);}
        return 0;
    }
    //3. 가게상세 페이지 호출
    public StoreDto doGetStoreInfo(int sno){
        StoreDto storeDto =null;
        System.out.println("StoreDao.doGetStoreInfo");
        try {
            String sql="select * from store where sno=? ";
            ps= conn.prepareStatement(sql);
            ps.setLong(1,sno); rs=ps.executeQuery();
            if(rs.next()){
                storeDto = StoreDto.builder()
                        .sno(rs.getLong("sno"))
                        .sname(rs.getString("sname"))
                        .sphone(rs.getString("sphone"))
                        .sadress( rs.getString("sadress"))
                        .scontent( rs.getString("scontent"))
                        .sstate( rs.getInt("sstate"))
                        .snumber( rs.getString("snumber"))
                        .categorya( rs.getInt("categorya"))
                        .categoryb( rs.getInt("categoryb"))
                        .sfile1( rs.getString("simg1"))
                        .sfile2( rs.getString("simg2"))
                        .sfile3( rs.getString("simg3"))
                        .sfile4( rs.getString("simg4"))
                        .mno(rs.getLong("mno"))
                        .build();
            }

        }catch (Exception e){
            System.out.println("e = " + e);
        }

        return storeDto;
    }

    //4. 가게 정보 수정



    //5. 가게 정보 삭제
    public boolean doDeleteStore( int sno){System.out.println("StoreController.doDeleteStore");
        try {
            String sql="delete from store where sno="+sno;
            ps=conn.prepareStatement(sql);
            int count=ps.executeUpdate();
            if(count==1){
                return true;
            }

        }catch (Exception e){
            System.out.println("e = " + e);
        }
        return false;
    }

}