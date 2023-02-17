package com.ssafy.beauduckboard.repository;

import com.ssafy.beauduckboard.entity.qa.BoardQaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardQaRepository extends JpaRepository<BoardQaEntity, Integer> {

    List<BoardQaEntity> findAllByIsActive(Boolean result);

}
