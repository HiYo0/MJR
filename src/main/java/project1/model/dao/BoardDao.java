package project1.model.dao;


import org.springframework.stereotype.Component;
import project1.model.dto.BoardDto;

import java.sql.SQLException;
import java.sql.Statement;

@Component
public class BoardDao extends Dao{//class start

    // 담당자 전승호====
    public int doWrite(BoardDto boardWriteFormData){
        try {
            String sql = "insert into board(bname, bcontent, mno, categorya, categoryb) values (?,?,?,?,?)";
            ps=conn.prepareStatement(sql , Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, boardWriteFormData.getBname());
            ps.setString(2,boardWriteFormData.getBcontent());
            ps.setInt(3,boardWriteFormData.getMno());
            ps.setInt(4,boardWriteFormData.getCategorya());
            ps.setInt(5,boardWriteFormData.getCategoryb());

            int count = ps.executeUpdate();
            if(count==1){
                rs=ps.getGeneratedKeys();
                if(rs.next()){return rs.getInt(1);}
            }
        }catch (SQLException e){
            System.out.println("e = " + e);
            return -2;
        }
        return 0;
    }


    // 담당자 전승호 END====
}
