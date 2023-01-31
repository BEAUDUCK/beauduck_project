package com.ssafy.beauduckmakeup.repository;

import com.ssafy.beauduckmakeup.entity.MakeupMainEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MakeupMainRepository extends JpaRepository<MakeupMainEntity, Integer> {
    MakeupMainEntity findByStep(String step);
}
