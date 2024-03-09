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

    // 게시물번호로 게시물내용과 작성자 정보(ID,프로필사진) 가져오기
    public BoardDto oneview(int bno){
        try {
            String sql = "select * from board b inner join member m on b.mno = m.mno where bno=?";
            ps = conn.prepareStatement(sql);
            ps.setInt(1,bno);
            rs= ps.executeQuery();
            if(rs.next()){
                BoardDto boardDto =new BoardDto();
                boardDto.setBno(rs.getInt(1));
                boardDto.setBname(rs.getString(2));
                boardDto.setBcontent(rs.getString(3));
                boardDto.setBcount(rs.getInt(4));
                boardDto.setBdate(rs.getString(5));
                boardDto.setMno(rs.getInt(6));
                boardDto.setCategorya(rs.getInt(7));
                boardDto.setCategoryb(rs.getInt(8));
                boardDto.setMid(rs.getString(10));
                boardDto.setMimg(rs.getString(19));

                return boardDto;
            }

        }catch (Exception e){System.out.println("e = " + e);}

        return null;
    }
    // 작성자와 유저의 정보가 일치하는지 조회하는 메소드
    public boolean ueserInfo(String mid , int bno){

        return false;
    }


    // 담당자 전승호 END====
}
