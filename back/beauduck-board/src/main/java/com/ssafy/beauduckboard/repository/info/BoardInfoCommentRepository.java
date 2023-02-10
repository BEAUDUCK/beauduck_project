package com.ssafy.beauduckboard.repository.info;

import com.ssafy.beauduckboard.entity.info.BoardInfoCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardInfoCommentRepository extends JpaRepository<BoardInfoCommentEntity, Integer> {

    List<BoardInfoCommentEntity> findAllByIsActive(Boolean result);

}
