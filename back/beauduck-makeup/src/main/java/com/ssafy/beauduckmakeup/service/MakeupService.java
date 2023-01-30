package com.ssafy.beauduckmakeup.service;
import com.ssafy.beauduckmakeup.dto.MakeupMainRequestDto;
import com.ssafy.beauduckmakeup.dto.MakeupRequestDto;
import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import com.ssafy.beauduckmakeup.repository.MakeupMainRepository;
import com.ssafy.beauduckmakeup.repository.MakeupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MakeupService {
    @Autowired
    private MakeupRepository makeupRepository;
    @Autowired
    private MakeupMainRepository makeupMainRepository;

    public boolean insert(MakeupRequestDto dto) {
        MakeupEntity makeup = makeupRepository.save(dto.toEntity());
        if(makeup == null) return false;

//        List<MakeupMainEntity> mainList = dto.getMakeupMainList();
//        MakeupMainEntity makeupMain = makeupMainRepository.saveAll(mainList);
        return true;
    }
}
