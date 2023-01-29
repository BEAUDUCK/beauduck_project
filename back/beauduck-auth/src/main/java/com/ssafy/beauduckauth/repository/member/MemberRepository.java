package com.ssafy.beauduckauth.repository.member;

import com.ssafy.beauduckauth.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
}
