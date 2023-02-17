package com.ssafy.beauduckauth.repository.makeup;

import com.ssafy.beauduckauth.entity.makeup.RecentMakeupEntity;
import com.ssafy.beauduckauth.entity.member.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecentMakeupRepository extends JpaRepository<RecentMakeupEntity, Integer> {
    List<RecentMakeupEntity> findAllByMemberEntity(MemberEntity memberEntity);
}
