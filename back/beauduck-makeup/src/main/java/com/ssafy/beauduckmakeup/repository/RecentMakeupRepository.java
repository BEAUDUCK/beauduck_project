package com.ssafy.beauduckmakeup.repository;


import com.ssafy.beauduckmakeup.entity.RecentMakeupEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecentMakeupRepository extends JpaRepository<RecentMakeupEntity, Integer> {
}
