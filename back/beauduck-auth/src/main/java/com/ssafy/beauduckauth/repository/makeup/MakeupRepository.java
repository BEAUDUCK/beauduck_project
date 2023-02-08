package com.ssafy.beauduckauth.repository.makeup;

import com.ssafy.beauduckauth.entity.makeup.MakeupEntity;
import com.ssafy.beauduckauth.entity.member.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MakeupRepository extends JpaRepository<MakeupEntity, Integer> {
    List<MakeupEntity> findAllByMemberEntity(MemberEntity memberEntity);
    Boolean existsByMemberEntity(MemberEntity memberEntity);
}
