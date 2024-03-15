package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.AlgorithmDto;
import project1.model.dto.StoreDto;

import java.util.ArrayList;
import java.util.List;

@Component
public class AlgorithmDao extends Dao{
    // 로그인한 멤버가 리뷰를 쓴 가게의 카테고리 가져오기
    public List<AlgorithmDto> doGetFindMember(int mno){
        List<AlgorithmDto> list = new ArrayList<>();
        try {
            String sql="select * from review r inner join store s on r.sno = s.sno where r.mno = "+mno;
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()){
                AlgorithmDto algorithmDto = AlgorithmDto.builder()
                        .category(rs.getInt("categoryb"))
                        .rvdate(rs.getString("rvdate"))
                        .build();
                list.add(algorithmDto);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }

    public void findBoardCategory(int mno){

    }

    public boolean insertAlgorithm(int mno , int alCategory){
        return true;
    }
}
