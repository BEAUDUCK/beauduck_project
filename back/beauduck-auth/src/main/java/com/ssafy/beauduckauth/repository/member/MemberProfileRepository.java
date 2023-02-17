package com.ssafy.beauduckauth.repository.member;


import com.ssafy.beauduckauth.entity.member.MemberEntity;
import com.ssafy.beauduckauth.entity.member.MemberProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberProfileRepository extends JpaRepository<MemberProfileEntity, Integer> {
    Optional<MemberProfileEntity> findByMemberEntity(MemberEntity memberEntity);
    Boolean existsByNickName(String nickName);
}
