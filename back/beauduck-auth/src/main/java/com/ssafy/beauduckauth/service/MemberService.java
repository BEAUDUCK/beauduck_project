package com.ssafy.beauduckauth.service;

import com.ssafy.beauduckauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.beauduckauth.dto.makeup.MakeupResponseDto;
import com.ssafy.beauduckauth.dto.member.*;
import com.ssafy.beauduckauth.entity.ai.ImgaiEntity;
import com.ssafy.beauduckauth.entity.makeup.MakeupEntity;
import com.ssafy.beauduckauth.entity.makeup.RecentMakeupEntity;
import com.ssafy.beauduckauth.entity.member.MemberEntity;
import com.ssafy.beauduckauth.entity.member.MemberGalleryEntity;
import com.ssafy.beauduckauth.entity.member.MemberProfileEntity;
import com.ssafy.beauduckauth.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.beauduckauth.repository.makeup.ImgaiRepository;
import com.ssafy.beauduckauth.repository.makeup.MakeupRepository;
import com.ssafy.beauduckauth.repository.makeup.RecentMakeupRepository;
import com.ssafy.beauduckauth.repository.member.MemberGalleryRepository;
import com.ssafy.beauduckauth.repository.member.MemberInfoRepository;
import com.ssafy.beauduckauth.repository.member.MemberProfileRepository;
import com.ssafy.beauduckauth.repository.member.MemberRepository;
import com.ssafy.beauduckauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final ResponseUtil responseUtil;
    private final MemberRepository memberRepository;
    private final MemberInfoRepository memberInfoRepository;
    private final MemberProfileRepository memberProfileRepository;
    private final MemberGalleryRepository memberGalleryRepository;
    private final MakeupRepository makeupRepository;
    private final RecentMakeupRepository recentMakeupRepository;
    private final ImgaiRepository imgaiRepository;


    // 회원 nickName 중복 여부 확인
    public ResponseSuccessDto<Boolean> checkNickName(String nickName) {
        System.out.println("check NickName method = " + nickName);
        Boolean isDuplicated = memberProfileRepository.existsByNickName(nickName);
        System.out.println(isDuplicated);
        ResponseSuccessDto<Boolean> res = responseUtil.successResponse(isDuplicated);
        return res;
    }

    // 회원 정보 조회
    public ResponseSuccessDto<ProfileResponseDto> getProfile(String memberId) {
        MemberEntity memberEntity = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
        MemberProfileEntity memberProfileEntity = memberProfileRepository.findByMemberEntity(memberEntity)
                .orElseThrow(() -> new RuntimeException("해당 회원의 프로필이 존재하지 않습니다."));

        ProfileResponseDto profileResponseDto = ProfileResponseDto.builder()
                .nickName(memberProfileEntity.getNickName())
                .img(memberProfileEntity.getImg())
                .content(memberProfileEntity.getContent())
                .exp(memberProfileEntity.getExp())
                .badge(memberProfileEntity.getBadge())
                .created_date(memberProfileEntity.getCreateDate())
                .updated_date(memberProfileEntity.getUpdateDate())
                .build();

        ResponseSuccessDto<ProfileResponseDto> res = responseUtil.successResponse(profileResponseDto);
        return res;
    }

    // 회원 정보 수정
    public ResponseSuccessDto<ProfileResponseDto> updateProfile(UpdateRequestDto updateRequestDto) {
        System.out.println("회원 수정");
        System.out.println(updateRequestDto.toString());
        MemberEntity memberEntity = memberRepository.findById(updateRequestDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
        MemberProfileEntity memberProfileEntity = memberProfileRepository.findByMemberEntity(memberEntity)
                .orElseThrow(() -> new RuntimeException("해당 회원의 프로필이 존재하지 않습니다."));


        System.out.println("회원");
        System.out.println(memberEntity.getId());

        System.out.println("프로필");
        System.out.println(memberProfileEntity.getNickName());
        memberProfileEntity.updateMemberProfile(updateRequestDto);

        ProfileResponseDto profileResponseDto = ProfileResponseDto.builder()
                .nickName(memberProfileEntity.getNickName())
                .img(memberProfileEntity.getImg())
                .content(memberProfileEntity.getContent())
                .exp(memberProfileEntity.getExp())
                .badge(memberProfileEntity.getBadge())
                .created_date(memberProfileEntity.getCreateDate())
                .updated_date(memberProfileEntity.getUpdateDate())
                .build();

        ResponseSuccessDto<ProfileResponseDto> res = responseUtil.successResponse(profileResponseDto);
        return res;
    }

    // 최근 진행 메이크업 목록
    public ResponseSuccessDto<List<MakeupResponseDto>> getRecentMakeup(String memberId) {
        MemberEntity memberEntity = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다"));

        List<RecentMakeupEntity> recentMakeupEntityList = recentMakeupRepository.findAllByMemberEntity(memberEntity);

        List<MakeupResponseDto> makeupResponseDtoList = new ArrayList<>();
        for (RecentMakeupEntity recentMakeupEntity : recentMakeupEntityList) {
            MakeupEntity makeupEntity = makeupRepository.findById(recentMakeupEntity.getMakeupEntity().getId())
                    .orElseThrow(() -> new RuntimeException("해당 makeup 정보가 없습니다."));

            MakeupResponseDto makeupResponseDto = MakeupResponseDto.builder()
                    .id(makeupEntity.getId())
                    .title(makeupEntity.getTitle())
                    .score(makeupEntity.getScore())
                    .count(makeupEntity.getCount())
                    .img(makeupEntity.getImg())
                    .build();
            makeupResponseDtoList.add(makeupResponseDto);
        }

        ResponseSuccessDto<List<MakeupResponseDto>> res = responseUtil.successResponse(makeupResponseDtoList);
        return res;
    }

    // 내가 만든 메이크업 목록
    public ResponseSuccessDto<List<MakeupResponseDto>> getMakeup(String memberId) {
        MemberEntity memberEntity = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다"));

        List<MakeupEntity> makeupEntityList = makeupRepository.findAllByMemberEntity(memberEntity);

        List<MakeupResponseDto> makeupResponseDtoList = new ArrayList<>();
        for (MakeupEntity makeupEntity : makeupEntityList) {
            MakeupResponseDto makeupResponseDto = MakeupResponseDto.builder()
                    .id(makeupEntity.getId())
                    .title(makeupEntity.getTitle())
                    .score(makeupEntity.getScore())
                    .count(makeupEntity.getCount())
                    .img(makeupEntity.getImg())
                    .build();
            makeupResponseDtoList.add(makeupResponseDto);
        }
        ResponseSuccessDto<List<MakeupResponseDto>> res = responseUtil.successResponse(makeupResponseDtoList);
        return res;
    }

    // 갤러리
    public ResponseSuccessDto<List<GalleryResponseDto>> getGallery(String memberId) {
        MemberEntity memberEntity = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));

        List<MemberGalleryEntity> memberGalleryEntityList = memberGalleryRepository.findAllByMemberEntityAndIsActiveTrue(memberEntity);

        List<GalleryResponseDto> galleryResponseDtoList = new ArrayList<>();
        for (MemberGalleryEntity memberGalleryEntity : memberGalleryEntityList) {
            GalleryResponseDto galleryResponseDto = GalleryResponseDto.builder()
                    .img(memberGalleryEntity.getImg())
                    .build();
            galleryResponseDtoList.add(galleryResponseDto);
        }

        ResponseSuccessDto<List<GalleryResponseDto>> res = responseUtil.successResponse(galleryResponseDtoList);
        return res;
    }

    // 갤러리 공개 여부 설정
    public ResponseSuccessDto<String> changeGalleryisActive(GalleryActiveRequesetDto galleryActiveRequesetDto) {
        MemberEntity memberEntity = memberRepository.findById(galleryActiveRequesetDto.getMemberId())
                .orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));

        MemberGalleryEntity memberGalleryEntity = memberGalleryRepository.findOneByMemberEntity(memberEntity)
                .orElseThrow(() -> new RuntimeException("해당 갤러리가 존재하지 않습니다"));

        memberGalleryEntity.updateActive(galleryActiveRequesetDto.getIsActive());

        return responseUtil.successResponse("success");
    }

    // 회원 얼굴 정보 저장 (AI)
    public ResponseSuccessDto<SaveImageResponseDto> saveImage(AiRequestDto aiRequestDto) {

        Boolean isExist = false;

        //makeup table에 memberId 데이터 있는지 확인
        MemberEntity memberEntity = memberRepository.findById(aiRequestDto.getMemberId())
                .orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));

        if (makeupRepository.existsByMemberEntity(memberEntity)) {
                isExist = true;
        }

        //Imgai table에 사진 등록 성공 여부
        ImgaiEntity imgaiEntity = ImgaiEntity.builder()
                .memberEntity(memberEntity)
                .img(aiRequestDto.getImg())
                .isMakeup(isExist)
                .build();
        imgaiRepository.save(imgaiEntity);

        System.out.println("AI table에 사진 등록 성공");

        SaveImageResponseDto saveImageResponseDto = SaveImageResponseDto.builder()
                .message("사진이 정상 등록되었습니다.")
                .build();

        return responseUtil.successResponse(saveImageResponseDto);
    }
}
