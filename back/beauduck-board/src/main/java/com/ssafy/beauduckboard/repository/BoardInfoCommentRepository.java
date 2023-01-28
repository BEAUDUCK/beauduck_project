package com.ssafy.beauduckboard.repository;

import com.ssafy.beauduckboard.entity.BoardInfoCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardInfoCommentRepository extends JpaRepository<BoardInfoCommentEntity, Integer> {
}
