package com.ssafy.beauduckmakeup.service;
import com.ssafy.beauduckmakeup.dto.MakeupMainRequestDto;
import com.ssafy.beauduckmakeup.dto.MakeupMiddleRequestDto;
import com.ssafy.beauduckmakeup.dto.MakeupRequestDto;
import com.ssafy.beauduckmakeup.dto.MakeupResponseDto;
import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMiddleEntity;
import com.ssafy.beauduckmakeup.repository.MakeupMainRepository;
import com.ssafy.beauduckmakeup.repository.MakeupMiddleRepository;
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
    @Autowired
    private MakeupMiddleRepository makeupMiddleRepository;

    @Transactional
    public boolean insert(MakeupRequestDto dto) {
//        dto.setId(dto.getId());
//        //Makeup 테이블에 데이터 저장
        MakeupEntity makeup = makeupRepository.save(dto.toEntity());
        if(makeup == null) return false;
//        //대분류 리스트 저장
//        List<MakeupMainRequestDto> mainEntityList = dto.getMakeupMainList();
//        makeupMainRepository.saveAll(mainEntityList);
//        //소분류 리스트 저장
//        for(MakeupMainRequestDto m: mainEntityList) {
//            System.out.println(m.getId());
//            makeupMiddleRepository.saveAll(m.getMakeupMiddleList());
//        }
        List<MakeupMainRequestDto> mainRequestDtoList = dto.getMakeupMainList();
        for(MakeupMainRequestDto mainDto: mainRequestDtoList) {
//            if(mainDto.getMakeupId()==null)
//                mainDto.setMakeupId(dto.toEntity());
            makeupMainRepository.save(mainDto.toEntity());
//            System.out.println(mainDto.getMakeupId().getId());
//
            List<MakeupMiddleRequestDto> middleRequestDtoList = mainDto.getMakeupMiddleList();
            for(MakeupMiddleRequestDto middleDto: middleRequestDtoList) {
//                if(middleDto.getMainId()==null)
//                    middleDto.setMainId(mainDto.toEntity());
                makeupMiddleRepository.save(middleDto.toEntity());
            }
        }
        return true;
    }

    @Transactional
    public List<MakeupResponseDto> selectAll() {
        List<MakeupEntity> makeupList = makeupRepository.findAll();
        List<MakeupResponseDto> makeupDtoList = new ArrayList<>();

        for(MakeupEntity e: makeupList) {
            MakeupResponseDto dto = MakeupResponseDto.builder()
                    .id(e.getId())
                    .memberId(e.getMemberId())
                    .title(e.getTitle())
                    .content(e.getContent())
                    .img(e.getImg())
                    .duration(e.getDuration())
                    .score(e.getScore())
                    .count(e.getCount())
                    .build();
            makeupDtoList.add(dto);
        }

        return makeupDtoList;
    }
}
