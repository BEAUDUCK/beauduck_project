package com.ssafy.beauduckmakeup.repository;

import com.ssafy.beauduckmakeup.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<MemberEntity, String> {
}
