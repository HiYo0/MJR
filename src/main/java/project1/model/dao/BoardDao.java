package project1.model.dao;


import org.springframework.stereotype.Component;
import project1.model.dto.BoardDto;
import project1.model.dto.ReplyDto;

import java.awt.*;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

@Component
public class BoardDao extends Dao{//class start

    // 담당자 전승호===================================

    // 현재 전체 게시물 수 알아내기
    public int getBoardSize( int categoryA , int categoryB , String key , String keyword ){
        try {
            String sql = "select count(*) from board b inner join member m on b.mno = m.mno ";

            // 추가 사항
            // 1. 카테고리 구분
                // 1-1. 카테고리 A가 있는경우
            if(categoryA>0 && categoryB==0){sql+=" where b.categorya = "+categoryA;}
                // 1-2. 카테고리 A가 있고 카테고리 B가 있는경우
            else if(categoryA>0 && categoryB>0){ sql +=" where b.categorya = "+categoryA+" and b.categoryb="+categoryB;}
                // 1-3. 카테고리 B만 있는경우
            else if (categoryA==0 && categoryB>0) {sql+=" where b.categoryb = "+categoryB;}

            System.out.println("keyword = "+keyword);
            // 2. 카테고리가 둘다 없고 검색키워드가 있는경우
                // 2-1. 검색어가 있고 카테고리 없으면 where 추가 카테고리 있으면 and 추가
            if(!keyword.isEmpty()&&categoryA==0&&categoryB==0){sql += " where ";}
            else if(!keyword.isEmpty()) {sql += " and ";}
                // 2-2. 검색어가있을경우
            if(!keyword.isEmpty()){
                if(key.equals("1")){sql +=" b.bname like '%"+keyword+"%' or m.mid like '%"+keyword+"%'";}
                else {sql+=" "+key+" like '%"+keyword+"%'";}
            }

            ps=conn.prepareStatement(sql);
            rs = ps.executeQuery();
            if(rs.next()){return rs.getInt(1);}

        }catch (Exception e){System.out.println("e = " + e);}
        return 0;
    }

    // 전체 게시글 호출하기
    public List<BoardDto> doGetBoardViewList(int startRow, int pageBoardSize ,int categoryA,int categoryB, String key , String keyword) {
        System.out.println("BoardDao.doGetBoardViewList");
        List<BoardDto> list = new ArrayList<>();
        BoardDto boardDto = null;
        try {
            // sql 앞부분
            String sql = "select * from board b inner join member m on b.mno = m.mno ";
            // 추가 사항
            // 1. 카테고리 구분
                // 1-1. 카테고리 A가 있는경우
            if(categoryA>0 && categoryB==0){sql+=" where b.categorya = "+categoryA;}
                // 1-2. 카테고리 A가 있고 카테고리 B가 있는경우
            else if(categoryA>0 && categoryB>0){ sql +=" where b.categorya = "+categoryA+" and b.categoryb="+categoryB;}
                // 1-3. 카테고리 B만 있는경우
            else if (categoryA==0 && categoryB>0) {sql+=" where b.categoryb = "+categoryB;}

            System.out.println("keyword = "+keyword);
            // 2. 카테고리가 둘다 없고 검색키워드가 있는경우
            // 2-1. 검색어가 있고 카테고리 없으면 where 추가 카테고리 있으면 and 추가
            if(!keyword.isEmpty()&&categoryA==0&&categoryB==0){sql += " where ";}
            else if(!keyword.isEmpty()) {sql += " and ";}
            // 2-2. 검색어가있을경우
            if(!keyword.isEmpty()){
                if(key.equals("1")){sql +=" b.bname like '%"+keyword+"%' or m.mid like '%"+keyword+"%'";}
                else {sql+=" "+key+" like '%"+keyword+"%'";}
            }

            // sql 뒷부분
            sql += " order by b.bdate desc limit ?,?";
            ps = conn.prepareStatement(sql);
            ps.setInt(1,startRow);
            ps.setInt(2,pageBoardSize);
            rs = ps.executeQuery();
            while (rs.next()) {
                boardDto = new BoardDto();
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

                list.add(boardDto);

            }// while end
            return list;
        }catch(Exception e) {System.out.println("e = " + e);}

        return list;

    }// method end

    // 글 저장 처리
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
// 댓글기능 라인 ================================================

    // 댓글내용 가져오기
    public List<ReplyDto> doReplyView(int bno) {
        List<ReplyDto> list = new ArrayList<>();
        try {
            String sql = "select*from reply r inner join member m on r.mno = m.mno  where bno = "+bno;
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()){
                ReplyDto replyDto = new ReplyDto();
                replyDto.setRpno(rs.getInt(1));
                replyDto.setRpcontent(rs.getString(2));
                replyDto.setRpdate(rs.getString(3));
                replyDto.setMno(rs.getInt(4));
                replyDto.setBno(rs.getInt(5));
                replyDto.setRpindex(rs.getInt(6));
                replyDto.setMid(rs.getString(8));
                list.add(replyDto);
            }return list;

        }catch (Exception e){System.out.println("e = " + e);}

        return list;
    }
    // 댓글 작성처리
    public int doReplyWrite(ReplyDto replyDto){
        try {
            String sql = "insert into reply(rpcontent, mno, bno, rpindex) values(?,?,?,?);";
            ps = conn.prepareStatement(sql);
            ps.setString(1,replyDto.getRpcontent());
            ps.setInt(2,replyDto.getMno());
            ps.setInt(3,replyDto.getBno());
            ps.setInt(4,replyDto.getRpindex());
            int count = ps.executeUpdate();
            if (count == 1){return replyDto.getBno();}

        }catch (Exception e){System.out.println(e);return -2;}

        return -2;
    }



    // 담당자 전승호 END====
}
