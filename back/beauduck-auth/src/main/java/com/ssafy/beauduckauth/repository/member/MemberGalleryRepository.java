package com.ssafy.beauduckauth.repository.member;

import com.ssafy.beauduckauth.entity.member.MemberEntity;
import com.ssafy.beauduckauth.entity.member.MemberGalleryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberGalleryRepository extends JpaRepository<MemberGalleryEntity, Integer> {
    List<MemberGalleryEntity> findAllByMemberEntityAndIsActiveTrue(MemberEntity memberEntity);
    Optional<MemberGalleryEntity> findOneByMemberEntity(MemberEntity memberEntity);
}
