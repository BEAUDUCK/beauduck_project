package com.ssafy.beauduckconsult.service;

import com.ssafy.beauduckconsult.dto.ConsultRequestDto;
import com.ssafy.beauduckconsult.dto.ConsultResponseDto;
import com.ssafy.beauduckconsult.entity.ConsultEntity;
import com.ssafy.beauduckconsult.repository.ConsultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ConsultService {

    private final ConsultRepository repository;

    @Transactional
    public boolean insert(ConsultRequestDto dto){
        ConsultEntity entity = repository.save(dto.ToEntity());
        if (entity == null){
            return false;
        }else return true;
    }

    @Transactional
    public List<ConsultResponseDto> selectAll(){
        List<ConsultEntity> togetherEntities = repository.findAllByIsActive(true);
        List<ConsultResponseDto> togetherList = new ArrayList<>();

        for(ConsultEntity together : togetherEntities){
            ConsultResponseDto togetherResponseDto = ConsultResponseDto.builder()
                    .id(together.getId())
                    .title(together.getTitle())
                    .content(together.getContent())
                    .isActive(together.getIsActive())
                    .host(together.getHost())
                    .created_date(together.getCreated_date())
                    .build();
            togetherList.add(togetherResponseDto);
        }
        return togetherList;
    }

    @Transactional
    public boolean delete(int id){
        Optional<ConsultEntity> byId = repository.findById(id);
        ConsultEntity boardQaEntity = byId.get();
        if (boardQaEntity.getId() == 0) return false;
        return boardQaEntity.delete();
    }

}
