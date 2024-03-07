package project1.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import project1.model.dao.BoardDao;
import project1.model.dto.BoardDto;
import project1.service.BoardService;

@Controller
@RequestMapping("/board")
public class BoardController {//class start

// 담당자 전승호 Start====
    @Autowired
    BoardDao boardDao;
    @Autowired
    BoardService boardService;


    // 글쓰기 페이지호출
    @GetMapping("/write")
    public String boardWrite(){
        System.out.println("BoardController.boardWrite");

        return "view/board/boardWrite";
    }
    // 글쓰기내용 등록
    @PostMapping("/create")
    @ResponseBody
    public int doWrite(BoardDto boardWriteFormData){
        System.out.println("boardWriteFormData = " + boardWriteFormData);

        return boardService.doWrite(boardWriteFormData);
    }

    // 개별글 호출



// 담당자 전승호 END====
}//class end
