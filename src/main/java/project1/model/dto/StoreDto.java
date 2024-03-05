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
    long sno;
    String sname;
    String sphone;
    String sadress;
    String scontent;
    int sstate;
    String snumber;
    int categorya;
    int categoryb;

    long mno;

    MultipartFile simg1;
    MultipartFile simg2;
    MultipartFile simg3;
    MultipartFile simg4;

}
