package project1.model.dto;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
@Builder
public class CouponDto {

    private int cno;
    private int cstate;
    private String cdate;
    private int ckind;
    private int mno;
    private int sno;
}
