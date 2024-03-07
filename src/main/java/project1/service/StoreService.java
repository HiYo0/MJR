package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project1.model.dao.StoreDao;
import project1.model.dto.StoreDto;

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
  /*  public StoreDto doGetStoreList(){
        System.out.println("StoreController.doGetStoreList");
        return ;
    }*/


}
