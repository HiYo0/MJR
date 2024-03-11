package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.*;

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

    public List<ReviewDto> adminRVview(){
        System.out.println("AdminService.adminRVview");
        List<ReviewDto> list = new ArrayList<>();
        try{
            String sql = "select * from review rv join member m on rv.mno = m.mno order by rv.rvno desc;";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()){
                ReviewDto reviewDto =
                    ReviewDto.builder()
                            .rvno(rs.getInt("rvno"))
                            .rvcontent(rs.getString("rvcontent"))
                            .rvimg(rs.getString("rvimg"))
                            .rvdate(rs.getString("rvdate"))
                            .mid(rs.getString("mid"))
                            .build();

                list.add(reviewDto);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }

    public List<StoreDto> adminSview(int[] sstates){
        System.out.println("AdminDao.adminSview");
        List<StoreDto> list = new ArrayList<>();
        try{

            String sql = "select * from store s join member m on s.mno = m.mno ";
            if(sstates==null){

            }else if (sstates.length >= 1) {
                for(int i = 0 ; i < sstates.length ; i ++){
                    if(i==0){
                        sql += " where s.sstate = "+sstates[i];
                    }else{
                        sql += " or s.sstate = " +sstates[i];
                    }
                }
            }
            sql += " order by s.sno desc;";
            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            while (rs.next()){
                StoreDto storeDto =
                        StoreDto.builder()
                                .mno(rs.getInt("mno"))
                                .scontent(rs.getString("scontent"))
                                .sno(rs.getInt("sno"))
                                .sfile1(rs.getString("simg1"))
                                .sstate(rs.getInt("sstate"))
                                .mid(rs.getString("mid"))
                                .sname(rs.getString("sname"))
                                .build();
                list.add(storeDto);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }

}
