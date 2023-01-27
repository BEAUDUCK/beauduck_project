package com.ssafy.beauduckboard.service;

import com.ssafy.beauduckboard.dto.info.BoardInfoRequestDto;
import com.ssafy.beauduckboard.dto.info.BoardInfoResponseDto;
import com.ssafy.beauduckboard.entity.BoardInfoEntity;
import com.ssafy.beauduckboard.repository.BoardInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
//    public BoardInfoResponseDto selectOne(int id) {
//        Optional<BoardInfoEntity> board = boardInfoRepository.findById(id);
//        BoardInfoEntity newBoard = board.get();
//
//        BoardInfoResponseDto dto = BoardInfoResponseDto.builder()
//                .writer(newBoard.getWriter())
//                .title(newBoard.getTitle())
//                .content(newBoard.getContent())
//                .count(newBoard.getCount())
//                .like(newBoard.getLike())
//                .build();
//    }

    

}
