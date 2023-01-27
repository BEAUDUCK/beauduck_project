package com.ssafy.beauduckboard.service;

import com.ssafy.beauduckboard.dto.info.BoardInfoRequestDto;
import com.ssafy.beauduckboard.dto.info.BoardInfoResponseDto;
import com.ssafy.beauduckboard.entity.BoardInfoEntity;
import com.ssafy.beauduckboard.repository.BoardInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardInfoService {

    @Autowired
    private BoardInfoRepository boardInfoRepository;

    //게시글 작성
    public int insert(BoardInfoRequestDto dto) {
        BoardInfoEntity board = boardInfoRepository.save(dto.toEntity());
        return board.getId();
    }

    //게시글 상세보기
    public BoardInfoResponseDto selectOne(int id) {
        Optional<BoardInfoEntity> board = boardInfoRepository.findById(id);
        BoardInfoEntity newBoard = board.get();

        BoardInfoResponseDto dto = BoardInfoResponseDto.builder()
                .writer(newBoard.getWriter())
                .title(newBoard.getTitle())
                .content(newBoard.getContent())
                .count(newBoard.getCount())
                .like(newBoard.getLike())
                .build();

        return dto;
    }

    //게시글 전체보기
    public List<BoardInfoResponseDto> selectAll() {
        List<BoardInfoEntity> boards = boardInfoRepository.findAll();
        List<BoardInfoResponseDto> boardList = new ArrayList<>();

        for(BoardInfoEntity e: boards) {
            BoardInfoResponseDto dto = BoardInfoResponseDto.builder()
                    .writer(e.getWriter())
                    .title(e.getTitle())
                    .content(e.getContent())
                    .count(e.getCount())
                    .like(e.getLike())
                    .build();
            boardList.add(dto);
        }

        return boardList;
    }

    @Transactional
    public int update(int id, BoardInfoRequestDto dto) {
        Optional<BoardInfoEntity> board = boardInfoRepository.findById(id);
        board.get().update(id, dto.getMemberId(), dto.getWriter(), dto.getTitle(), dto.getContent(), dto.getCount(), dto.getLike());

        return id;
    }

}
