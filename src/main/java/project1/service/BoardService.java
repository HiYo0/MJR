package project1.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project1.model.dao.BoardDao;
import project1.model.dto.BoardDto;

@Service
public class BoardService {//class start

    @Autowired
    BoardDao boardDao;
    @Autowired
    private HttpServletRequest request;

    // 글 등록 기능
    public int doWrite(BoardDto boardWriteFormData){
//        // 현재 로그인된 세션 찾아오기
//        Object object = request.getSession().getAttribute("logininfo");
//        // 로그인 내역이 없으면 -1 있으면 통과
//        if(object == null){return -1;}
//        // 2. 형변환
//        String  mno = (String) object;
        boardWriteFormData.setMno(2); // 테스트용 임시

        return boardDao.doWrite(boardWriteFormData);
    }

}//class end
