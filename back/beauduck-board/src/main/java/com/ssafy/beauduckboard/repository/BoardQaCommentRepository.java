package com.ssafy.beauduckboard.repository;

import com.ssafy.beauduckboard.entity.qa.BoardQaCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardQaCommentRepository extends JpaRepository<BoardQaCommentEntity, Integer> {

    List<BoardQaCommentEntity> findAllByIsActive(Boolean result);

}
