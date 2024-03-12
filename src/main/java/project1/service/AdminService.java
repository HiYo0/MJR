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

    public List<MemberDto> adminMview(int page, int tablerows, String key, String keyword){
        System.out.println("AdminService.adminMview");
        return adminDao.adminMview(page, tablerows, key, keyword);
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
