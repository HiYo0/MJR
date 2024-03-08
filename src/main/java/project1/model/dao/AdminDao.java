package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.BoardDto;
import project1.model.dto.MemberDto;
import project1.model.dto.ReplyDto;

import java.util.ArrayList;
import java.util.List;

@Component
public class AdminDao extends Dao{

    public List<MemberDto> adminMview(){
        System.out.println("AdminService.adminMview");
        List<MemberDto> list = new ArrayList<>();
        try{
            String sql = "select * from member order by mno desc";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();

            while(rs.next()){
                MemberDto memberDto =
                        MemberDto.builder()
                                .mno(rs.getInt("mno"))
                                .mid(rs.getString("mid"))
                                .mname(rs.getString("mname"))
                                .mdate(rs.getString("mdate"))
                                .mstate(rs.getInt("mstate"))
                                .build();

                list.add(memberDto);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }

    public List<BoardDto> adminBview(){
        System.out.println("AdminDao.adminBview");
        List<BoardDto> list = new ArrayList<>();
        try{
            String sql = "select * from board b join member m on b.mno = m.mno order by b.bno desc";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()){
                BoardDto boardDto =
                        BoardDto.builder()
                                .bno(rs.getInt("bno"))
                                .bname(rs.getString("bname"))
                                .mid(rs.getString("mid"))
                                .mno(rs.getInt("mno"))
                                .bdate(rs.getString("bdate"))
                                .bcount(rs.getInt("bcount"))
                                .build();
                list.add(boardDto);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }

    public List<ReplyDto> adminRPview(){
        System.out.println("AdminDao.adminRPview");
        List<ReplyDto> list = new ArrayList<>();
        try{
            String sql = "select * from reply rp join member m on rp.mno = m.mno order by rp.rpno desc";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while(rs.next()){
                ReplyDto replyDto =
                        ReplyDto.builder()
                                .rpno(rs.getInt("rpno"))
                                .rpcontent(rs.getString("rpcontent"))
                                .rpdate(rs.getString("rpdate"))
                                .mno(rs.getInt("mno"))
                                .mid(rs.getString("mid"))
                                .bno(rs.getInt("bno"))
                                .rpindex(rs.getInt("rpindex"))
                                .build();
                list.add(replyDto);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }

}
