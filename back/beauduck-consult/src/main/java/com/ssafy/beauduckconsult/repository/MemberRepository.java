package com.ssafy.beauduckconsult.repository;

import com.ssafy.beauduckconsult.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
}

