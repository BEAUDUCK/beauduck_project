package com.ssafy.beauduckconsult.repository;

import com.ssafy.beauduckconsult.entity.ConsultEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConsultRepository extends JpaRepository<ConsultEntity, Integer> {

    List<ConsultEntity> findAllByIsActive(boolean result);

}
