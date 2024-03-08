package project1.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ReviewDto {
    int rvno;
    String rvcontent;
    String rvdate;
    String rvimg;
    int sno;
    int mno;
    // 원래 필드 ==
    // 빌더용 추가 필드 ==

    // 빌더용 추가 필드 끝 ==
}
