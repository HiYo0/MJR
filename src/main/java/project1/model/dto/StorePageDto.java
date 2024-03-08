package project1.model.dto;

import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class StorePageDto {
    // 부가 정보//
    //1. 현재페이지:
    private int page;
    //2. 총 페이지수
    private int totalPage;
    //3. 페이지버튼의 시작번호
    private int startBtn;
    //4. 페이지버튼의 끝번호
    private int endBtn;
    //5. 총 가게 수
    private int totalStoreSize;

    // 실제 내용 //
    private List<StoreDto> list;

}
