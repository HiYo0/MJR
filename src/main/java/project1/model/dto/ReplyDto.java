package project1.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class ReplyDto {
    int rpno;
    String rpcontent;
    String rpdate;
    int mno;
    int bno;
    int rpindex;
    // == 이까지 Reply 원래 필드
    // == 추가 필드 시작 ==
    String mid;

    // == 추가 필드 끝 ==
}
