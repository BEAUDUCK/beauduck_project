package com.ssafy.beauduckmakeup.service;
import com.ssafy.beauduckmakeup.dto.*;
import com.ssafy.beauduckmakeup.entity.*;
import com.ssafy.beauduckmakeup.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
    @Autowired
    private RecentMakeupRepository recentMakeupRepository;
    @Autowired
    private MemberGalleryRepository memberGalleryRepository;
    @Autowired
    private ImgaiRepository imgaiRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Transactional
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

        //imgai 테이블에 isMakeup true로 바꿔주기
        Optional<MemberEntity> memberEntity = memberRepository.findById(dto.getMemberId());
        System.out.println("일단 멤버 찾기: "+memberEntity.get().getId());
        Optional<ImgaiEntity> imgaiEntity =imgaiRepository.findByMemberEntity(memberEntity.get());
//        System.out.println("imgai에서 찾았졍: "+ imgaiEntity.get().getMemberEntity().getId());
//        ImgaiEntity imgai = imgaiEntity.get();
//        System.out.println("업데이트 전: "+imgai.getIsMakeup());
        if(imgaiEntity.isPresent())
            imgaiEntity.get().updateIsMakeup();
//        System.out.println("업데이트 후: "+imgai.getIsMakeup());
        return makeup.getId();
    }

    @Transactional
    public List<MakeupResponseDto> selectAll() {
        List<MakeupEntity> makeupList = makeupRepository.findAllByOrderByIdDesc();
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

    public List<MakeupResponseDto> selectTop10() {
        List<MakeupEntity> makeupList = makeupRepository.findAll(getSort());
        List<MakeupResponseDto> makeupDtoList = new ArrayList<>();
        int cnt=0;
        for(MakeupEntity e: makeupList) {
            if(cnt==10) break;

            MakeupResponseDto dto = MakeupResponseDto.builder()
                    .id(e.getId())
                    .title(e.getTitle())
                    .img(e.getImg())
                    .score(e.getScore())
                    .count(e.getCount())
                    .build();
            makeupDtoList.add(dto);
            cnt++;
        }

        return makeupDtoList;
    }

    private Sort getSort() {
        return Sort.by(
                    Sort.Order.desc("count"),
                    Sort.Order.desc("score")
        );
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

    public MakeupResponseDto selectExecute(int makeupId, MakeupExecuteRequestDto dto) {
        //원래 해당 메이크업의 대분류 스텝 리스트 뽑기
        Optional<MakeupEntity> m = makeupRepository.findById(makeupId);
        List<MakeupMainEntity> makeupMainList = m.get().getMakeupMainList();
//        List<String> originList = new ArrayList<>();
//        for(MakeupMainEntity mm: makeupMainList) {
//            originList.add(mm.getStep());
//        }

        //대분류 리스트 만들기
        List<MakeupMainResponseDto> mainList = new ArrayList<>();
        String[] mains = dto.getMainList();

        for(String mainStep: mains) {
            for(MakeupMainEntity mme: makeupMainList) {
                if(mme.getStep().equals(mainStep)) {
                    //소분류 리스트 뽑기
                    List < MakeupMiddleResponseDto > midList = selectAllMiddle(mme);


                    MakeupMainResponseDto md = MakeupMainResponseDto.builder()
                            .id(mme.getId())
                            .step(mme.getStep())
                            .makeupMiddleList(midList)
                            .build();

                    mainList.add(md);
                    continue;
                }
            }
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
