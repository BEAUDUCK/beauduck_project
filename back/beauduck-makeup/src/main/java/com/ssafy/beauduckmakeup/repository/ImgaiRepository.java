package com.ssafy.beauduckmakeup.repository;

import com.ssafy.beauduckmakeup.entity.ImgaiEntity;
import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import com.ssafy.beauduckmakeup.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;
//@NoRepositoryBean
public interface ImgaiRepository extends JpaRepository<ImgaiEntity, Integer> {
    Optional<ImgaiEntity> findByMemberEntity(MemberEntity memberEntity);
}
