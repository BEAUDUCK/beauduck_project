package com.ssafy.beauduckconsult.service;


import com.ssafy.beauduckconsult.dto.member.MemberProfileDto;
import com.ssafy.beauduckconsult.entity.MemberEntity;
import com.ssafy.beauduckconsult.entity.MemberProfileEntity;
import com.ssafy.beauduckconsult.repository.MemberProfileRepository;
import com.ssafy.beauduckconsult.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberProfileRepository memberProfileRepository;

    public boolean updateExp(MemberProfileDto memberProfileDto){
        MemberEntity memberEntity = memberRepository.findById(memberProfileDto.getMemberEntity().getId()).orElseThrow(() -> new RuntimeException("해당 회원이 존재하지 않습니다."));
        MemberProfileEntity memberProfileEntity = memberProfileRepository.findByMemberEntity(memberEntity)
                .orElseThrow(() -> new RuntimeException("해당 회원의 프로필이 존재하지 않습니다."));
        return memberProfileEntity.updateExp(memberProfileDto.getExp(), memberProfileDto.getBadge());
    }


}
