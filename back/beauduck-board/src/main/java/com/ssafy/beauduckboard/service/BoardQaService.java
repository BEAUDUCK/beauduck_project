package com.ssafy.beauduckboard.service;

import com.ssafy.beauduckboard.dto.qa.BoardQaDto;
import com.ssafy.beauduckboard.dto.qa.BoardQaRequestDto;
import com.ssafy.beauduckboard.dto.qa.BoardQaResponseDto;
import com.ssafy.beauduckboard.entity.BoardQaEntity;
import com.ssafy.beauduckboard.repository.BoardQaRepository;
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
    public boolean createBoard(BoardQaRequestDto boardQaRequestDto){
        BoardQaEntity boardQaEntity = boardQaRepository.save(boardQaRequestDto.ToEntity());
        if (boardQaEntity == null){
            return false;
        }else return true;
    }

    @Transactional
    public List<BoardQaResponseDto> readBoardList(){
        List<BoardQaEntity> boardQaEntities = boardQaRepository.findAll();
        List<BoardQaResponseDto> boardQaList = new ArrayList<>();

        for(BoardQaEntity board : boardQaEntities){
            BoardQaResponseDto boardDto = BoardQaResponseDto.builder()
                    .board_id(board.getBoard_id())
                    .member_id(board.getMember_id())
                    .writer(board.getWriter())
                    .like(board.getLike())
                    .count(board.getLike())
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
    public void deleteBoard(int id){
        boardQaRepository.deleteById(id);
    }

    @Transactional
    public boolean updateBoard(int id, BoardQaRequestDto boardQaRequestDto){
        Optional<BoardQaEntity> byId = boardQaRepository.findById(id);
        BoardQaEntity boardQaEntity = byId.get();
        return boardQaEntity.updateBoard(boardQaRequestDto.getTitle(), boardQaRequestDto.getContent());
    }


}
