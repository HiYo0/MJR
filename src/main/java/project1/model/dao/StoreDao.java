package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.StoreDto;

@Component
public class StoreDao extends Dao{
    public long doPostStoreReg(StoreDto storeDto) {
        System.out.println("StoreDao.doPostStoreReg");
        System.out.println("storeDto = " + storeDto);
        try {
            String sql=
                    "insert into store(sname,sphone,simg1,simg2,simg3,simg4,sadress,scontent,snumber,categorya,categoryb,mno) " +
                            " value(?,?,?,?,?,?,?,?,?,?,?,?)";
            ps=conn.prepareStatement(sql);
            ps.setString(1,storeDto.getSname());
            ps.setString(2, storeDto.getSphone());
            ps.setString(3, storeDto.getSfile1());
            ps.setString(4, storeDto.getSfile2());
            ps.setString(5, storeDto.getSfile3());
            ps.setString(6, storeDto.getSfile4());
            ps.setString(7, storeDto.getSadress());
            ps.setString(8, storeDto.getScontent());
            ps.setString(9,storeDto.getSnumber());
            ps.setInt(10,storeDto.getCategorya());
            ps.setInt(11,storeDto.getCategoryb());
            ps.setLong(12,storeDto.getMno());
            int count=ps.executeUpdate();
            if(count==1){
                System.out.println("등록성공");
                return 1;
            }

        }catch (Exception e){
            System.out.println("e = " + e);
        }
        return 0;
    }

    //2. 가게 전체 출력
    /*public StoreDto doGetStoreList(){
        System.out.println("StoreController.doGetStoreList");
        return ;
    }*/

}
