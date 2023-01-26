package com.ssafy.beauduckboard.service;

import com.ssafy.beauduckboard.repository.BoardInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardInfoService {

    @Autowired
    private BoardInfoRepository boardInfoRepository;

    

}
