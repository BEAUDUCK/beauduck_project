package com.ssafy.beauduckboard.repository;

import com.ssafy.beauduckboard.entity.BoardInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardInfoRepository extends JpaRepository<BoardInfoEntity, Integer> {
}
