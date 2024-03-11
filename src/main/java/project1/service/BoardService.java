package project1.service;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dao.BoardDao;
import project1.model.dao.MemberDao;
import project1.model.dto.BoardDto;
import project1.model.dto.BoardPageDto;
import project1.model.dto.ReplyDto;

import java.util.List;

@Service
public class BoardService {//class start

    @Autowired
    BoardDao boardDao;
    @Autowired // 세션가져오는 인터페이스
    private HttpServletRequest request;
    @Autowired
    MemberDao memberDao;

    // 글목록(전체게시글) 정보호출
    public BoardPageDto doBoardList(int page, int pageBoardSize, int categoryA, int categoryB, String key, String keyword){
        System.out.println("BoardService.doBoardList");

        // 페이지당 게시물을 출력할 시작 레코드번호.
        int startRow = (page-1)*pageBoardSize;
        // 총 페이지수
            // 1. 전체 게시물수
        int totalBoardSize = boardDao.getBoardSize(categoryA ,categoryB, key , keyword);
            // 2. 총페이지수 계산
        int totalPage = totalBoardSize % pageBoardSize == 0 ?
                totalBoardSize / pageBoardSize : totalBoardSize / pageBoardSize +1 ;
        // 게시물 정보 요청
        List<BoardDto> list = boardDao.doGetBoardViewList(startRow,pageBoardSize,categoryA,categoryB,key , keyword);

        // 페이징버튼
        int btnSize = 5;        // 페이지버튼 최대 개수 5개씩
        int startBtn = (page-1)/btnSize*btnSize+1; // 페이지버튼 시작번호
        int endBtn = startBtn+btnSize-1; // 페이지버튼 끝번호

        // 만약에 페이지버튼의 끝번호가 총페이지수 보다는 커질수 없다.
        if( endBtn >= totalPage )endBtn = totalPage;

        BoardPageDto boardPageDto = new BoardPageDto();
            boardPageDto.setPage(page);
            boardPageDto.setTotalPage(totalPage);
            boardPageDto.setStartBtn(startBtn);
            boardPageDto.setEndBtn(endBtn);
            boardPageDto.setTotalBoardSize(totalBoardSize);
            boardPageDto.setList(list);

        return boardPageDto;

    }

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
        // 세션 찾아오기 ID
        Object object = request.getSession().getAttribute("logininfo");
        String mid = "";
        if(object != null){mid = (String) object;}

        System.out.println(mid);

        // 유저정보 확인하기( 자기가 작성한 글인지 or 어드민인지 )
        try {
            if(memberDao.doGetLoginInfo(mid).getMno()==result.getMno() || memberDao.doGetLoginInfo(mid).getMstate()==3){
                // 만약 작성자와 로그인한 유저정보가 동일하다면 또는 회원상태가 3(어드민)이면
                result.setUeserinfo(true);}
        }catch (NullPointerException e){result.setUeserinfo(false);}

        System.out.println("result = " + result);

        return result;
    }

// 댓글기능 =================================================
    // 댓글 내용 호출하기
    public List<ReplyDto> doReplyView(int bno) {
        System.out.println("BoardService.doReplyView");

        List<ReplyDto> result = boardDao.doReplyView(bno);

        return result;
    }
    // 댓글 작성처리
    public int doReplyWrite(int bno ,String rpcontent){
        System.out.println("BoardService.replyWirte");

        // 세션 찾아오기 ID
        Object object = request.getSession().getAttribute("logininfo");
        String mid = "";
        if(object != null){mid = (String) object;}
        else {return -1;}// 로그인정보 없음 반환

        ReplyDto replyDto = new ReplyDto();
        replyDto.setMno(memberDao.doGetLoginInfo(mid).getMno());
        replyDto.setMid(mid);
        replyDto.setRpcontent(rpcontent);
        replyDto.setRpindex(0);// 임시


        return boardDao.doReplyWrite(replyDto);
    }

}//class end
