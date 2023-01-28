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
                .id(id)
                .writer(newBoard.getWriter())
                .isActive(newBoard.isActive())
                .title(newBoard.getTitle())
                .content(newBoard.getContent())
                .count(newBoard.getCount())
                .likes(newBoard.getLikes())
                .build();

        return dto;
    }

    //게시글 전체보기
    public List<BoardInfoResponseDto> selectAll() {
        List<BoardInfoEntity> boards = boardInfoRepository.findAll();
        List<BoardInfoResponseDto> boardList = new ArrayList<>();

        for(BoardInfoEntity e: boards) {
            BoardInfoResponseDto dto = BoardInfoResponseDto.builder()
                    .id(e.getId())
                    .writer(e.getWriter())
                    .isActive(e.isActive())
                    .title(e.getTitle())
                    .content(e.getContent())
                    .count(e.getCount())
                    .likes(e.getLikes())
                    .createdDate(e.getCreated_date())
                    .build();
            boardList.add(dto);
        }
        return boardList;
    }

    //게시글 수정
    @Transactional
    public int update(int id, BoardInfoRequestDto dto) {
        Optional<BoardInfoEntity> board = boardInfoRepository.findById(id);
        return board.get().update(id, dto);
    }

//    public int addLikes(int id) {
//        Optional<BoardInfoEntity> board = boardInfoRepository.findById(id);
//        if(board==null) return -1;
//
//        BoardInfoEntity newBoard = board.get();
//
//        BoardInfoResponseDto dto = BoardInfoResponseDto.builder()
//                .id(id)
//                .writer(newBoard.getWriter())
//                .isActive(newBoard.isActive())
//                .title(newBoard.getTitle())
//                .content(newBoard.getContent())
//                .count(newBoard.getCount())
//                .likes(newBoard.getLikes()+1)
//                .build();
//
//        return id;
//    }

}
