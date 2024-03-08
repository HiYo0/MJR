package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project1.model.dao.AdminDao;
import project1.model.dto.MemberDto;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    AdminDao adminDao;

    public List<MemberDto> adminMview(){
        System.out.println("AdminService.adminMview");
        return adminDao.adminMview();
    }
}
