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

    public boolean insert(MakeupRequestDto dto) {
        //Makeup 테이블에 데이터 저장
        MakeupEntity makeup = makeupRepository.save(dto.toEntity());
        //대분류 리스트 저장
        List<MakeupMainRequestDto> mainEntityList = dto.getMakeupMainList();
        List<MakeupMainEntity> mlist = new ArrayList<>();
        for(MakeupMainRequestDto md: mainEntityList) {
            md.setMakeupId(makeup);
            mlist.add(md.toEntity());
        }
        //소분류 리스트 저장
        for(MakeupMainRequestDto m: mainEntityList) {
            List<MakeupMiddleRequestDto> mdlist = m.getMakeupMiddleList();
            List<MakeupMiddleEntity> mmlist = new ArrayList<>();

            MakeupMainEntity mEntity = m.toEntity();
            for(MakeupMiddleRequestDto me: mdlist) {
                me.setMainId(mEntity);
                mmlist.add(me.toEntity());
            }
            makeupMiddleRepository.saveAll(mmlist);
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
                    .title(e.getTitle())
                    .img(e.getImg())
                    .score(e.getScore())
                    .count(e.getCount())
                    .build();
            makeupDtoList.add(dto);
        }

        return makeupDtoList;
    }

    public MakeupResponseDto selectOne(int id) {
        Optional<MakeupEntity> makeupEntity = makeupRepository.findById(id);
        MakeupEntity makeup = makeupEntity.get();

        MakeupResponseDto dto = MakeupResponseDto.builder()
                .title(makeup.getTitle())
                .content(makeup.getContent())
                .score(makeup.getScore())
                .count(makeup.getCount())
                .duration(makeup.getDuration())
                .img(makeup.getImg())
                .build();

        return dto;
    }

    
}
