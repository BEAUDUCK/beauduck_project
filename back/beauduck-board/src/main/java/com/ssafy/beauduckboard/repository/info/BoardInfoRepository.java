package com.ssafy.beauduckboard.repository.info;

import com.ssafy.beauduckboard.entity.info.BoardInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardInfoRepository extends JpaRepository<BoardInfoEntity, Integer> {

    List<BoardInfoEntity> findAllByIsActive(Boolean result);

}
