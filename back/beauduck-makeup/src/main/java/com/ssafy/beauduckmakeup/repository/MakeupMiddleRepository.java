package com.ssafy.beauduckmakeup.repository;

import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import com.ssafy.beauduckmakeup.entity.MakeupMiddleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MakeupMiddleRepository extends JpaRepository<MakeupMiddleEntity, Integer> {
    List<MakeupMiddleEntity> findAllByMainId(MakeupMainEntity mainId);
}
