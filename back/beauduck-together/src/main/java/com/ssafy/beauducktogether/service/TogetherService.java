package com.ssafy.beauducktogether.service;


import com.ssafy.beauducktogether.dto.TogetherRequestDto;
import com.ssafy.beauducktogether.dto.TogetherResponseDto;
import com.ssafy.beauducktogether.entity.TogetherEntity;
import com.ssafy.beauducktogether.repository.TogetherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TogetherService {

    private final TogetherRepository repository;

    @Transactional
    public boolean insert(TogetherRequestDto dto){
        TogetherEntity entity = repository.save(dto.ToEntity());
        if (entity == null){
            return false;
        }else return true;
    }

    @Transactional
    public List<TogetherResponseDto> selectAll(){
        List<TogetherEntity> togetherEntities = repository.findAllByIsActive(true);
        List<TogetherResponseDto> togetherList = new ArrayList<>();

        for(TogetherEntity together : togetherEntities){
            TogetherResponseDto togetherResponseDto = TogetherResponseDto.builder()
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
        Optional<TogetherEntity> byId = repository.findById(id);
        TogetherEntity boardQaEntity = byId.get();
        if (boardQaEntity.getId() == 0) return false;
        return boardQaEntity.delete();
    }

}
