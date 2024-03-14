package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.BoardDto;
import project1.model.dto.MemberDto;
import project1.model.dto.ReplyDto;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class MemberDao extends Dao{
    // 1. 회원가입 처리 요청
    public boolean doPostSignup(MemberDto memberDto){
        System.out.println("MemberDao.doPostSignup");
        System.out.println("memberDto = " + memberDto);
        try {
            String sql = "insert into member(mid,mpw,mname,memail,mphone,mbirth,msex,maddress,mimg) values(?,?,?,?,?,?,?,?,?)";
            ps = conn.prepareStatement(sql);
            ps.setString(1, memberDto.getMid());
            ps.setString(2, memberDto.getMpw());
            ps.setString(3, memberDto.getMname());
            ps.setString(4, memberDto.getMemail());
            ps.setString(5, memberDto.getMphone());
            ps.setString(6, memberDto.getMbirth());
            ps.setString(7, memberDto.getMsex());
            ps.setString(8, memberDto.getMaddress());
            ps.setString(9, memberDto.getMimg());
            int count = ps.executeUpdate();
            if(count == 1){
                return true;
            }
        }catch (Exception e){
            System.out.println("회원가입 실패 : " + e);
        }
        return false;
    }

    // 2. 아이디 중복검사
    public boolean doGetIdCheck(String mid){
        System.out.println("MemberDao.doGetIdCheck");
        try {
            String sql = "select * from member where mid = ?";
            ps = conn.prepareStatement(sql);
            ps.setString(1,mid);
            rs = ps.executeQuery();
            if (rs.next()){
                return true;
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return false;
    }

    // 3. 로그인 처리 요청
    public boolean doPostLogin(String loginId ,String loginPw){
        System.out.println("MemberDao.doPostLogin");
        try {
            String sql="select * from member where mid = ? and mpw = ?";
            ps = conn.prepareStatement(sql);
            ps.setString(1,loginId);
            ps.setString(2,loginPw);
            rs = ps.executeQuery();
            if(rs.next()){
                return true;
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return false;
    }

    // 4. 회원 정보 요청
    public MemberDto doGetLoginInfo(String mid){
        System.out.println("MemberDao.doGetLoginInfo");
        MemberDto memberDto = null;
        try {
            String sql="select * from member where mid = ?";
            ps = conn.prepareStatement(sql);
            ps.setString(1,mid);
            rs = ps.executeQuery();
            if(rs.next()){
                memberDto = new MemberDto(
                        rs.getInt("mno"),
                        rs.getString("mid"),
                        null,
                        rs.getString("mname"),
                        rs.getString("memail"),
                        rs.getString("mphone"),
                        rs.getString("mbirth"),
                        null,
                        null,
                        null,
                        rs.getString("msex"),
                        rs.getString("maddress"),
                        rs.getString("mdate"),
                        rs.getString("mimg"),
                        null,
                        rs.getInt("mstate"),
                        null
                );
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return memberDto;
    }

    // 4. 내정보
    public MemberDto doGetMyInfo(int mno){
        System.out.println("MemberController.doGetMyInfo");
        MemberDto memberDto = null;
        try {
            String sql="select * from member where mno = ?";
            ps = conn.prepareStatement(sql);
            ps.setInt(1,mno);
            rs = ps.executeQuery();
            if(rs.next()){
                memberDto = new MemberDto(
                        rs.getInt("mno"),
                        rs.getString("mid"),
                        null,
                        rs.getString("mname"),
                        rs.getString("memail"),
                        rs.getString("mphone"),
                        rs.getString("mbirth"),
                        null,
                        null,
                        null,
                        rs.getString("msex"),
                        rs.getString("maddress"),
                        rs.getString("mdate"),
                        rs.getString("mimg"),
                        null,
                        rs.getInt("mstate"),
                        null
                );
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return memberDto;
    }

    // 5. 회원 정보 수정
    public boolean doPostUpdateInfo(MemberDto memberDto){
        System.out.println("MemberDao.doPostUpdateInfo");
        System.out.println("memberDto = " + memberDto);
        try {
            String sql="update member set mpw = ? , mphone = ? , memail = ? , maddress = ? where mno = ?";
            ps = conn.prepareStatement(sql);
            ps.setString(1,memberDto.getMpw());
            ps.setString(2,memberDto.getMphone());
            ps.setString(3,memberDto.getMemail());
            ps.setString(4,memberDto.getMaddress());
            ps.setInt(5,memberDto.getMno());
            int count = ps.executeUpdate();
            if(count == 1){
                return true;
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return false;
    }

    // 6. 내가 쓴 글 출력
    public List<BoardDto> doGetBoardList(int mno){
        List<BoardDto> list = new ArrayList<>();
        try {
            String sql="select * from board where mno = ?";
            ps = conn.prepareStatement(sql);
            ps.setInt(1,mno);
            rs = ps.executeQuery();
            while (rs.next()){
                BoardDto boardDto = new BoardDto(
                        rs.getInt("bno"),
                        rs.getString("bname"),
                        null,
                        0,
                        rs.getString("bdate"),
                        rs.getInt("mno"),
                        0,
                        0,
                        false,
                        null,
                        null
                );
                list.add(boardDto);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }

    // 7. 내가 쓴 댓글 출력
    public List<ReplyDto> doGetReplyList(int mno){
        List<ReplyDto> list = new ArrayList<>();
        try {
            String sql="select * from reply where mno = ?";
            ps = conn.prepareStatement(sql);
            ps.setInt(1,mno);
            rs = ps.executeQuery();
            while (rs.next()){
                ReplyDto replyDto = new ReplyDto();
                replyDto.setRpno(rs.getInt("rpno"));
                replyDto.setRpcontent(rs.getString("rpcontent"));
                replyDto.setRpdate(rs.getString("rpdate"));
                replyDto.setMno(rs.getInt("mno"));
                replyDto.setBno(rs.getInt("bno"));
                replyDto.setRpindex(rs.getInt("rpindex"));
                list.add(replyDto);
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return list;
    }

    // 8. 회원 탈퇴
    public boolean doGetMemberDelete(String mpw){
        try {
            String sql="update member set mstate = 2 where mpw = ?";
            ps = conn.prepareStatement(sql);
            ps.setString(1,mpw);
            int count = ps.executeUpdate();
            if (count == 1){
                return true;
            }
        }catch (Exception e){
            System.out.println(e);
        }
        return false;
    }
}
