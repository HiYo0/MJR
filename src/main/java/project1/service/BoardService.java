package project1.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import project1.model.dao.BoardDao;
import project1.model.dao.MemberDao;
import project1.model.dto.BoardDto;

@Service
public class BoardService {//class start

    @Autowired
    BoardDao boardDao;
    @Autowired // 세션가져오는 인터페이스
    private HttpServletRequest request;
    @Autowired
    MemberDao memberDao;

    // 글 등록 기능
    public int doWrite(BoardDto boardWriteFormData){
        // 현재 로그인된 세션 찾아오기
        Object object = request.getSession().getAttribute("logininfo");
        // 로그인 내역이 없으면 -1 있으면 통과
        if(object == null){return -1;}
        // 2. 형변환
        String  mid = (String) object;
            // mid 로 member 정보 가져오기

        // boardWriteFormData.setMno(2); // 테스트용 임시

        return boardDao.doWrite(boardWriteFormData);
    }

    // bno 받아와서 글정보 주기
    public BoardDto oneview(int bno){
        System.out.println("BoardService.oneview");
        // 글정보 가져오기
        BoardDto result = boardDao.oneview(bno);

        // 글정보가 현재 로그인 정보랑 같은지 판별하기 ueserinfo

        // 현재 로그인된 세션 찾아오기 ID
        Object object = request.getSession().getAttribute("logininfo");
        String  mid = (String) object;
        // 유저정보 확인하기
        boardDao.ueserInfo(mid,bno);
        result.setUeserinfo(false); // 값 바꺼야함


        return result;
    }

}//class end
