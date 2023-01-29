package com.ssafy.beauduckboard.repository;

import com.ssafy.beauduckboard.entity.BoardQaEntity;
import com.ssafy.beauduckboard.entity.CommentQaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.xml.stream.events.Comment;
import java.util.List;

public interface CommentQaRepository extends JpaRepository<CommentQaEntity, Integer> {

    List<CommentQaEntity> findAllByIsActive(Boolean result);

}
