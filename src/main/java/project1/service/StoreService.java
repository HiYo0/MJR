package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import project1.model.dao.StoreDao;
import project1.model.dto.StoreDto;
import project1.model.dto.StorePageDto;

import java.util.List;

@Service
public class StoreService {
    @Autowired
    private StoreDao storeDao;

    @Autowired
    private FileService fileService;

    //1. 가게 등록 처리
    public long doPostStoreReg(StoreDto storeDto) {
        System.out.println("StoreService.doPostStoreReg");
    String fileName1 = fileService.fileUpload(storeDto.getSimg1());
    String fileName2 = fileService.fileUpload(storeDto.getSimg2());
    String fileName3 = fileService.fileUpload(storeDto.getSimg3());
    String fileName4 = fileService.fileUpload(storeDto.getSimg4());
    if(fileName1!=null&&fileName2!=null&&fileName3!=null&&fileName4!=null){
        storeDto.setSfile1(fileName1);
        storeDto.setSfile2(fileName2);
        storeDto.setSfile3(fileName3);
        storeDto.setSfile4(fileName4);
    }else{return -1;}
        //2. DB처리
        return storeDao.doPostStoreReg(storeDto);

    }
    //2. 가게 전체 출력
    public StorePageDto doGetStoreList(int page, int pageBoardSize,
                                       int categorya,int categoryb,
                                       String key, String keyword){
        System.out.println("StoreController.doGetStoreList");
        //페이지처리시 사용할 SQL 구문 : limit 시작레코드번호(0부터), 출력개수

        //1. 페이지당 게시물을 출력할 개수       [출력개수]
        //int pageBoardSize = 5;
        //2. 페이지당 게시물을 출력할 시작 레코드번호.    [시작레코드번호(0부터)
        int startRow= (page-1)*pageBoardSize;
        //3. 총 페이지수
        //1. 전체 게시물수
        int totalBoardSize = storeDao.getStoreSize(categorya,categoryb,key,keyword);
        //2. 총 페이지수 계산 (나머지값이 존재하면 +1)
        int totalPage = totalBoardSize % pageBoardSize == 0 ?
                totalBoardSize / pageBoardSize :
                totalBoardSize / pageBoardSize + 1;

        //4. 게시물 정보 요청
        List<StoreDto> list=storeDao.dogetStoreViewList(startRow,pageBoardSize,categorya,categoryb, key, keyword);

        //5. 페이징 버튼 개수
        //1. 페이지버튼 최대 개수
        int btnSize = 5;        //5개씩
        //2. 페이지버튼 시작번호
        int startBtn= 1+((page-1)/btnSize)*btnSize  ;        // 1번 버튼
        //3. 페이지버튼 끝번호
        int endBtn= btnSize+startBtn-1;                      // 5번 버튼
        // 만약에 페이지버튼의 끝번호가 총페이지수보다는 커질 수 없다.
        if(endBtn>=totalPage) endBtn=totalPage;



        //pageDto 구성 * 빌더패턴: 생성자의 단점(매개변수에 따른 유연성 부족)을 보완
        // new 연산자 없이 builder() 함수 이용한 객체 생성 라이브러리 제공
        // 사용방법: 클래스명.build().필드명(대입값).필드명(대입값).build();
        // 생성자보다 유연성이 좋음: 매개변수의 순서와 개수가 자유롭다
        //빌더패턴 vs 생성자 vs setter
        StorePageDto storePageDto =StorePageDto.builder()
                .page(page)
                .totalBoardSize(totalBoardSize)
                .totalPage(totalPage)
                .list(list)
                .startBtn(startBtn)
                .endBtn(endBtn)
                .build();
        return storePageDto ;
    }


}
