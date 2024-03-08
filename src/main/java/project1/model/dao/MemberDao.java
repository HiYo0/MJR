package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.MemberDto;

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
}
