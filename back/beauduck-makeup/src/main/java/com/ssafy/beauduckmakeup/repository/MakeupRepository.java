package com.ssafy.beauduckmakeup.repository;

import com.ssafy.beauduckmakeup.entity.MakeupEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MakeupRepository extends JpaRepository<MakeupEntity, Integer> {

//    List<MakeupEntity> findTop10ByScore(float score, Sort sort);
    List<MakeupEntity> findAllByOrderByIdDesc();
}
