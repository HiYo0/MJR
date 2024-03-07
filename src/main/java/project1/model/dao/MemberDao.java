package project1.model.dao;

import org.springframework.stereotype.Component;
import project1.model.dto.MemberDto;

@Component
public class MemberDao extends Dao{
    // 1. 회원가입 처리 요청
    public boolean doPostSignup(MemberDto memberDto){
        System.out.println("memberDto = " + memberDto);
        try {
            String sql = "insert into member(mid,mpw,mname,memail,mphone,mbirth,msex,maddress) values(?,?,?,?,?,?,?,?)";
            ps = conn.prepareStatement(sql);
            ps.setString(1, memberDto.getMid());
            ps.setString(2, memberDto.getMpw());
            ps.setString(3, memberDto.getMname());
            ps.setString(4, memberDto.getMemail());
            ps.setString(5, memberDto.getMphone());
            ps.setString(6, memberDto.getMbirth());
            ps.setString(7, memberDto.getMsex());
            ps.setString(8, memberDto.getMaddress());
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
}
