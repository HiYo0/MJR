package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;



@Component
public class AdminDao extends Dao{

    public int getTableSize(int[] state, String key, String keyword){
        try{
            System.out.println("state = " + Arrays.toString(state) + ", key = " + key + ", keyword = " + keyword);
            String sql= "select count(*) member";
            // ======================= 1. 만약에 카테고리 조건이 있으면 where 추가
            sql += " where mstate = "+ state; // state 0 일반회원, 1 정지회원, 2 탈퇴, 3 관리자
            // 2. 만약 검색 있을 때
            if(!keyword.isEmpty()){
                System.out.println("★검색 키워드가 존재");
//                if(state>0){sql += " and ";} // 카테고리 있을때. and로 연결
//                else{sql += " where ";} // 카테고리 없을 때 where로 연결
                sql += key+" like '%" + keyword +"%'";
            }

            ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
            if(rs.next()){return rs.getInt(1);};
        }
        catch (Exception e){
            System.out.println(e);
        }
        return 0;
    }

    public List<MemberDto> adminMview(){
        System.out.println("AdminDao.adminMview");
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
                                .mphone(rs.getString("mphone"))
                                .build();

                list.add(memberDto);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }

    public Object adminMview(String detail, int page, int tablerows, int[] state, String key, String keyword){
        System.out.println("AdminDao.adminMview");
        System.out.println("detail = " + detail + ", page = " + page + ", tablerows = " + tablerows + ", state = " + Arrays.toString(state) + ", key = " + key + ", keyword = " + keyword);

        if(detail.equals("member")){List<MemberDto> list = new ArrayList<>();
            try{
                String sql = "select * from " +detail;
                // ======================= 1. 만약에 카테고리 조건이 있으면 where 추가
                if(state==null){

                }else if (state.length >= 1) {
                    for(int i = 0 ; i < state.length ; i ++){
                        if(i==0){
                            sql += " where mstate = "+state[i];
                        }else{
                            sql += " or mstate = " +state[i];
                        }
                    }
                }
                // 2. 만약 검색 있을 때
                if(!keyword.isEmpty()){
                    System.out.println("★검색 키워드가 존재");
                    if(state!=null){sql += " and ";} // 카테고리 있을때. and로 연결
                    else{sql += " where ";} // 카테고리 없을 때 where로 연결
                    sql += key+" like '%" + keyword +"%'";
                }
                sql += " order by mno desc";
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
                                    .mphone(rs.getString("mphone"))
                                    .build();

                    list.add(memberDto);
                }
            }catch (Exception e){
                System.out.println(e);
            }
            return list;
        }
        else if(detail.equals("reply")){List<ReplyDto> list = new ArrayList<>();
            try{
                String sql = "select * from " +detail+ " rp inner join member m on rp.mno=m.mno";
                // ======================= 1. 카테고리 조건없음

                // 2. 만약 검색 있을 때
                if(!keyword.isEmpty()){
                    System.out.println("★검색 키워드가 존재");
                    sql += " where "; // 카테고리 없을 때 where로 연결
                    sql += key+" like '%" + keyword +"%'";
                }
                sql += " order by rpno desc";
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
        else if(detail.equals("store")){List<StoreDto> list = new ArrayList<>();
            try{
                String sql = "select * from " +detail+ " s inner join member m on s.mno=m.mno";
                // ======================= 1. 만약에 카테고리 조건이 있으면 where 추가
                if(state==null){

                }else if (state.length >= 1) {
                    for(int i = 0 ; i < state.length ; i ++){
                        if(i==0){
                            sql += " where sstate = "+state[i];
                        }else{
                            sql += " or sstate = " +state[i];
                        }
                    }
                }
                // 2. 만약 검색 있을 때
                if(!keyword.isEmpty()){
                    System.out.println("★검색 키워드가 존재");
                    if(state!=null){sql += " and ";} // 카테고리 있을때. and로 연결
                    else{sql += " where ";} // 카테고리 없을 때 where로 연결
                    sql += key+" like '%" + keyword +"%'";
                }
                sql += " order by sno desc";
                ps = conn.prepareStatement(sql);
                rs = ps.executeQuery();


                while(rs.next()){
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
            return list;}
        else if(detail.equals("review")){List<ReviewDto> list = new ArrayList<>();
            try{
                String sql = "select * from " +detail+ " rv inner join member m on rv.mno=m.mno";

                // 2. 만약 검색 있을 때
                if(!keyword.isEmpty()){
                    System.out.println("★검색 키워드가 존재");
                    if(state!=null){sql += " and ";} // 카테고리 있을때. and로 연결
                    else{sql += " where ";} // 카테고리 없을 때 where로 연결
                    sql += key+" like '%" + keyword +"%'";
                }
                sql += " order by rvno desc";
                ps = conn.prepareStatement(sql);
                rs = ps.executeQuery();


                while(rs.next()){
                    ReviewDto reviewDto =
                            ReviewDto.builder()
                                    .rvno(rs.getInt("rvno"))
                                    .rvcontent(rs.getString("rvcontent"))
                                    .rvimg(rs.getString("rvimg"))
                                    .rvdate(rs.getString("rvdate"))
                                    .mid(rs.getString("mid"))
                                    .sno(rs.getInt("sno"))
                                    .build();

                    list.add(reviewDto);
                }
            }catch (Exception e){
                System.out.println(e);
            }
            return list;}
        else if(detail.equals("board")){List<BoardDto> list = new ArrayList<>();
            try{
                String sql = "select * from " +detail+ " b inner join member m on b.mno=m.mno ";

                // 2. 만약 검색 있을 때
                if(!keyword.isEmpty()){
                    System.out.println("★검색 키워드가 존재");
                    if(state!=null){sql += " and ";} // 카테고리 있을때. and로 연결
                    else{sql += " where ";} // 카테고리 없을 때 where로 연결
                    sql += key+" like '%" + keyword +"%'";
                }
                sql += " order by bno desc";
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
            return list;}

        return null;
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
                            .sno(rs.getInt("sno"))
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
