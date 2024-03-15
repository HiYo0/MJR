package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import project1.model.dao.AlgorithmDao;
import project1.model.dto.AlgorithmDto;
import project1.model.dto.StoreDto;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

@Service
public class AlgorithmService {
    @Autowired
    AlgorithmDao algorithmDao;

    int[] categoryScore = new int[6];
    int alCategory;
    public List<AlgorithmDto> doGetFindMember(int mno){
        Calendar cal = Calendar.getInstance();
        LocalDate now = LocalDate.now();

        String nowmonth = Integer.toString(now.getMonthValue());
        if(now.getMonthValue() < 10){
            nowmonth = "0"+nowmonth;
        }

        // 현재날짜 int
        int nowdate = Integer.parseInt(now.getYear()+nowmonth+now.getDayOfMonth());

        // 1-1. 리뷰쓴 가게의 카테고리 번호 가져오기
        List<AlgorithmDto> categoryInfo = algorithmDao.doGetFindMember(mno);

        // 1-2. 리뷰 썻으면 해당 가게 카테고리에 +3
        for(int i = 0; i < categoryInfo.size(); i++){
            // 리뷰 날짜 쪼개기
            String[] datetime = categoryInfo.get(i).getRvdate().split(" ");
            String[] date = datetime[0].split("-");

            cal.set(Calendar.YEAR,Integer.parseInt(date[0]));
            cal.set(Calendar.MONTH,Integer.parseInt(date[1]));
            cal.set(Calendar.DATE,Integer.parseInt(date[2]));

            // 일주일 후 날짜
            cal.add(Calendar.DATE,7);

            String y = Integer.toString(cal.get(Calendar.YEAR));
            String m = Integer.toString(cal.get(Calendar.MONTH)+1);
            String d = Integer.toString(cal.get(Calendar.DATE));
            
            if(cal.get(Calendar.MONTH)+1 < 10){
                m = "0"+m;
            }

            // 리뷰등록 일주일 후 날짜 int
            int after7day = Integer.parseInt(y + m + d);

            for(int j = 0; j < categoryScore.length; j++){
                if(categoryInfo.get(i).getCategory() == j){
                    if(nowdate <= after7day){
                        categoryScore[j] += 5;
                    }else{
                        categoryScore[j] += 3;
                    }
                }
            }
        }

        // 2-1. 게시글
        algorithmDao.findBoardCategory(mno);

        // 카테고리 정렬
        Arrays.sort(categoryScore);

        // i번째 categoryScore 값이 categoryScore 최댓값과 같으면 saveScore에 해당 인덱스 저장
        for (int i = 0; i < categoryScore.length; i++){
            if(categoryScore[i]==categoryScore[categoryScore.length - 1]){
                alCategory = i;
            }
        }
        System.out.println(Arrays.toString(categoryScore));
        System.out.println(categoryScore[categoryScore.length - 1]);

        // 로그인한 회원번호와 카테고리 번호 DB에 저장
        boolean result = algorithmDao.insertAlgorithm(mno,alCategory);
        if(result){
            // return ; 알고리즘 테이블 값 가져오기
        }
        return categoryInfo;
    }
}