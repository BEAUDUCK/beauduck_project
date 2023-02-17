package com.ssafy.beauduckauth.repository.member;

import com.ssafy.beauduckauth.entity.member.MemberEntity;
import com.ssafy.beauduckauth.entity.member.MemberInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberInfoRepository extends JpaRepository<MemberInfoEntity, Integer> {
    Optional<MemberInfoEntity> findByEmail(String email);
    Optional<MemberInfoEntity> findByMemberEntity(MemberEntity memberEntity);
}
