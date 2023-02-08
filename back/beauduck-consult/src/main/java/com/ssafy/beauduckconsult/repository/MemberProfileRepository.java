package com.ssafy.beauduckconsult.repository;


import com.ssafy.beauduckconsult.entity.MemberEntity;
import com.ssafy.beauduckconsult.entity.MemberProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberProfileRepository extends JpaRepository<MemberProfileEntity, Integer> {
    Optional<MemberProfileEntity> findByMemberEntity(MemberEntity memberEntity);
    Boolean existsByNickName(String nickName);
}
