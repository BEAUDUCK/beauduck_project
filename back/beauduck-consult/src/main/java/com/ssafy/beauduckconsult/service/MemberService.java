package com.ssafy.beauduckconsult.service;


import com.ssafy.beauduckconsult.dto.common.response.ResponseSuccessDto;
import com.ssafy.beauduckconsult.dto.member.MemberProfileDto;
import com.ssafy.beauduckconsult.dto.redis.RoomResponseDto;
import com.ssafy.beauduckconsult.entity.MemberEntity;
import com.ssafy.beauduckconsult.entity.MemberProfileEntity;
import com.ssafy.beauduckconsult.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.beauduckconsult.repository.MemberProfileRepository;
import com.ssafy.beauduckconsult.repository.MemberRepository;
import com.ssafy.beauduckconsult.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final ResponseUtil responseUtil;
    private final MemberRepository memberRepository;
    private final MemberProfileRepository memberProfileRepository;

    public ResponseSuccessDto<RoomResponseDto> updateExp(MemberProfileDto memberProfileDto){
        MemberEntity memberEntity = memberRepository.findById(memberProfileDto.getMemberId()).orElseThrow(() -> new EntityIsNullException("해당 회원이 존재하지 않습니다."));
        MemberProfileEntity memberProfileEntity = memberProfileRepository.findByMemberEntity(memberEntity)
                .orElseThrow(() -> new EntityIsNullException("해당 회원의 프로필이 존재하지 않습니다."));
        memberProfileEntity.updateExp(memberProfileDto.getExp(), memberProfileDto.getBadge());
        RoomResponseDto roomResponseDto = RoomResponseDto.builder().message("경험치 업데이트 완료!").build();
        return responseUtil.successResponse(roomResponseDto);
    }
}
