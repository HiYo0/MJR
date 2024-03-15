package project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import project1.model.dao.AlgorithmDao;

@Service
public class AlgorithmService {
    @Autowired
    AlgorithmDao algorithmDao;
}
