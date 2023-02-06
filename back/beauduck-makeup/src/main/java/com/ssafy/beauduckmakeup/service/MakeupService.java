package com.ssafy.beauduckmakeup.service;
import com.ssafy.beauduckmakeup.dto.*;
import com.ssafy.beauduckmakeup.entity.*;
import com.ssafy.beauduckmakeup.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
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
    @Autowired
    private RecentMakeupRepository recentMakeupRepository;

    @Autowired
    private MemberGalleryRepository memberGalleryRepository;

    public int insert(MakeupRequestDto dto) {
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
        return makeup.getId();
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
                .id(makeup.getId())
                .title(makeup.getTitle())
                .content(makeup.getContent())
                .score(makeup.getScore())
                .count(makeup.getCount())
                .duration(makeup.getDuration())
                .img(makeup.getImg())
                .build();

        return dto;
    }

    @Transactional
    public List<MakeupMiddleResponseDto> selectAllMiddle(MakeupMainEntity me) {
        List<MakeupMiddleEntity> makeupList = makeupMiddleRepository.findAllByMainId(me);
        List<MakeupMiddleResponseDto> midList = new ArrayList<>();

        for(MakeupMiddleEntity e: makeupList) {
            MakeupMiddleResponseDto dto = MakeupMiddleResponseDto.builder()
                    .id(e.getId())
                    .mainId(e.getMainId())
                    .step(e.getStep())
                    .img(e.getImg())
                    .colorCode(e.getColorCode())
                    .content(e.getContent())
                    .build();
            midList.add(dto);
        }

        return midList;
    }

    public MakeupResponseDto selectExecute(MakeupExecuteRequestDto dto) {
        //대분류 리스트 만들기
        List<MakeupMainResponseDto> mainList = new ArrayList<>();
        String[] mains = dto.getMainList();

        for(String mainStep: mains) {
            MakeupMainEntity main = makeupMainRepository.findByStep(mainStep);

            //소분류 리스트 뽑기
            List<MakeupMiddleResponseDto> midList = selectAllMiddle(main);


            MakeupMainResponseDto md = MakeupMainResponseDto.builder()
                    .id(main.getId())
                    .step(main.getStep())
                    .makeupMiddleList(midList)
                    .build();

            mainList.add(md);
        }

        MakeupResponseDto mainDto = new MakeupResponseDto();
        mainDto.setMakeupMainList(mainList);

        return mainDto;
    }
    @Transactional
    public boolean updateScore(int id, float score) {
        Optional<MakeupEntity> makeupEntity = makeupRepository.findById(id);
        MakeupEntity makeup = makeupEntity.get();

        int newCount = makeup.getCount()+1;
        float newScore = ( makeup.getScore() * makeup.getCount() + score ) / newCount;
        return makeup.updateScore(newScore, newCount);
    }

    public boolean addRecentMakeup(MakeupScoreRequestDto dto) {
        RecentMakeupRequestDto recent = new RecentMakeupRequestDto(dto.getMakeupEntity(), dto.getMemberEntity());

        RecentMakeupEntity makeup = recentMakeupRepository.save(recent.toEntity());
        if(makeup==null)
            return false;
        return true;
    }

    public boolean addToGallery(MemberGalleryRequestDto dto) {
        MemberGalleryEntity gallery = memberGalleryRepository.save(dto.toEntity());

        if(gallery == null)
            return false;
        return true;
    }

    @Transactional
    public boolean updateImg(int makeupId, String url) {
        Optional<MakeupEntity> m = makeupRepository.findById(makeupId);
        MakeupEntity makeup = m.get();

        if(makeup.updateImg(url))
            return true;
        return false;

    }

}
