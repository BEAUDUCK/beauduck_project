package com.ssafy.beauduckboard.service;

import com.ssafy.beauduckboard.dto.qa.BoardQaRequestDto;
import com.ssafy.beauduckboard.dto.qa.BoardQaResponseDto;
import com.ssafy.beauduckboard.entity.qa.BoardQaEntity;
import com.ssafy.beauduckboard.repository.qa.BoardQaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardQaService {

    private final BoardQaRepository boardQaRepository;

    @Transactional
    public boolean insert(BoardQaRequestDto boardQaRequestDto){
        BoardQaEntity boardQaEntity = boardQaRepository.save(boardQaRequestDto.ToEntity());
        if (boardQaEntity == null){
            return false;
        }else return true;
    }

    @Transactional
    public List<BoardQaResponseDto> selectAll(){
        List<BoardQaEntity> boardQaEntities = boardQaRepository.findAllByIsActive(true);
        List<BoardQaResponseDto> boardQaList = new ArrayList<>();

        for(BoardQaEntity board : boardQaEntities){
            BoardQaResponseDto boardDto = BoardQaResponseDto.builder()
                    .id(board.getId())
                    .memberId(board.getMemberId())
                    .writer(board.getWriter())
                    .likes(board.getLikes())
                    .count(board.getCount())
                    .title(board.getTitle())
                    .content(board.getContent())
                    .isActive(board.getIsActive())
                    .created_date(board.getCreated_date())
                    .updated_date(board.getUpdated_date())
                    .build();
            boardQaList.add(boardDto);
        }
        return boardQaList;
    }

    @Transactional
    public boolean delete(int id){
        Optional<BoardQaEntity> byId = boardQaRepository.findById(id);
        BoardQaEntity boardQaEntity = byId.get();
        if (boardQaEntity.getId() == 0) return false;
        return boardQaEntity.deleteBoard();
    }

    @Transactional
    public boolean update(int id, BoardQaRequestDto boardQaRequestDto){
        Optional<BoardQaEntity> byId = boardQaRepository.findById(id);
        BoardQaEntity boardQaEntity = byId.get();
        return boardQaEntity.updateBoard(boardQaRequestDto.getTitle(), boardQaRequestDto.getContent());
    }

    @Transactional
    public BoardQaResponseDto selectOne(int id){
        Optional<BoardQaEntity> byId = boardQaRepository.findById(id);
        BoardQaEntity board = byId.get();

        board.updateCount(board.getCount() + 1);
        BoardQaResponseDto boardQaResponseDto =BoardQaResponseDto.builder()
                .id(board.getId())
                .memberId(board.getMemberId())
                .writer(board.getWriter())
                .likes(board.getLikes())
                .count(board.getCount())
                .title(board.getTitle())
                .content(board.getContent())
                .isActive(board.getIsActive())
                .created_date(board.getCreated_date())
                .updated_date(board.getUpdated_date())
                .build();

        return boardQaResponseDto;
    }


}
