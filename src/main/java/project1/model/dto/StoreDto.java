package project1.model.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class StoreDto {
    private long sno;
    private String sname;
    private String sphone;
    private String sadress;
    private String scontent;
    private int sstate;
    private String snumber;
    private int categorya;
    private int categoryb;

    private long mno;

    private MultipartFile simg1;
    private MultipartFile simg2;
    private MultipartFile simg3;
    private MultipartFile simg4;

}
