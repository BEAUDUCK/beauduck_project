package com.ssafy.beauducktogether.repository;

import com.ssafy.beauducktogether.entity.TogetherEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TogetherRepository extends JpaRepository<TogetherEntity, Integer> {
    List<TogetherEntity> findAllByIsActive(boolean result);
}
