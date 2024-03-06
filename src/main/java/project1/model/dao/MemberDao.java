package project1.model.dao;

import org.springframework.stereotype.Component;

@Component
public class MemberDao extends Dao{
    // 1. 회원가입 처리 요청
    public boolean doPostSignup(){
        try {
            String sql = "insert into member()";
        }catch (Exception e){
            System.out.println("회원가입 실패 : " + e);
        }
        return false;
    }
}
