package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import project1.model.dao.AdminDao;
import project1.model.dto.*;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    AdminDao adminDao;

    public List<MemberDto> adminMview(){
        System.out.println("AdminService.adminMview");
        return adminDao.adminMview();
    }
    
    // 멤버 디테일 뷰
    public AdminPageDto adminMview(String detail, int page, int tablerows, int[] state, String key, String keyword){
        System.out.println("AdminService.adminMview");
        int startRow = (page-1)*tablerows; // (sql 구문의 limit 앞번호, 뒷번호 에서 앞번호)
        // 전체 게시물 수
        int totalBoardSize = adminDao.getTableSize(state, key, keyword);
        // 2. 총 페이지수 계산 (나머지 값 없으면 그대로, 나머지 있으면 +1)
        int totalPage = totalBoardSize % tablerows == 0 ?
                totalBoardSize/tablerows : totalBoardSize/tablerows+1;

        // 4. 게시물 정보 요청
        Object list = adminDao.adminMview(detail, startRow, tablerows, state, key, keyword);
        // 5. 페이징 버튼 개수
        // 1. 페이지버튼 최대 개수
        int btnSize = 3; // 3개씩
        // 2. 페이지 버튼 시작번호
        int startBtn = ((page-1)/btnSize*btnSize)+1;
        // 3. 페이지 버튼 끝번호
        int endBtn =(btnSize+(page%btnSize==0? page/btnSize-1 : page/btnSize)*btnSize);
        // 페이지버튼의 끝 번호가 총페이지수 보다는 커질수 없다.
        if(endBtn>=totalPage){endBtn=totalPage;}
        // pageDto 구성 (page 값 넘기려고 추가로 작업하는 일)

         AdminPageDto adminPageDto =
                    AdminPageDto.builder()
                                .page(page)
                                .totalPage(totalPage)
                                .totalBoardSize(totalBoardSize)
                                .list(list)
                                .startBtn(startBtn)
                                .endBtn(endBtn)
                                .build();



        return adminPageDto;
    }

    public List<BoardDto> adminBview(){
        System.out.println("AdminService.adminBview");
        return adminDao.adminBview();
    }

    public List<ReplyDto> adminRPview(){
        System.out.println("AdminService.adminRPview");
        return adminDao.adminRPview();
    }

    public List<ReviewDto> adminRVview(){
        System.out.println("AdminService.adminRVview");
        return adminDao.adminRVview();
    }

    public List<StoreDto> adminSview(int[] sstates){
        System.out.println("AdminService.adminSview");
        return adminDao.adminSview(sstates);
    }
}
