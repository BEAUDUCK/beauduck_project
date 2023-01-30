package com.ssafy.beauduckauth.repository.member;


import com.ssafy.beauduckauth.entity.MemberProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberProfileRepository extends JpaRepository<MemberProfileEntity, Integer> {
}
