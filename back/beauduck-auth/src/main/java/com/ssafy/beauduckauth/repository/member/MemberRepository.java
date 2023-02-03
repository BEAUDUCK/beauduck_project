package com.ssafy.beauduckauth.repository.member;

import com.ssafy.beauduckauth.entity.member.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
}
