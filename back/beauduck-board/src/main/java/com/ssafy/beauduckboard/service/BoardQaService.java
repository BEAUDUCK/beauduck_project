package com.ssafy.beauduckboard.service;

import com.ssafy.beauduckboard.dto.qa.BoardQaRequestDto;
import com.ssafy.beauduckboard.dto.qa.BoardQaResponseDto;
import com.ssafy.beauduckboard.entity.qa.BoardQaEntity;
import com.ssafy.beauduckboard.repository.BoardQaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.lang.reflect.Member;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardQaService {

    private final BoardQaRepository boardQaRepository;

//    @Transactional
//    public boolean insert(BoardQaRequestDto boardQaRequestDto){
//        BoardQaEntity boardQaEntity = boardQaRepository.save(boardQaRequestDto.ToEntity());
//        if (boardQaEntity == null){
//            return false;
//        }else return true;
//    }

    @Transactional
    public int insert(BoardQaRequestDto boardQaRequestDto){
        BoardQaEntity boardQaEntity = boardQaRepository.save(boardQaRequestDto.ToEntity());
        return boardQaEntity.getId();
    }

    @Transactional
    public List<BoardQaResponseDto> selectAll(){
        List<BoardQaEntity> boardQaEntities = boardQaRepository.findAllByIsActive(true);
        List<BoardQaResponseDto> boardQaList = new ArrayList<>();

        for(BoardQaEntity board : boardQaEntities){
            BoardQaResponseDto boardDto = BoardQaResponseDto.builder()
                    .id(board.getId())
                    .memberEntity(board.getMemberEntity())
                    .writer(board.getWriter())
                    .memberId(board.getMemberEntity().getMemberId())
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
//        System.out.println(boardQaList.get(0).getMemberId());
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
                .memberEntity(board.getMemberEntity())
                .writer(board.getWriter())
                .likes(board.getLikes())
                .count(board.getCount())
                .title(board.getTitle())
                .content(board.getContent())
                .isActive(board.getIsActive())
                .created_date(board.getCreated_date())
                .updated_date(board.getUpdated_date())
                .memberId(board.getMemberEntity().getMemberId())
                .build();

        return boardQaResponseDto;
    }


}
