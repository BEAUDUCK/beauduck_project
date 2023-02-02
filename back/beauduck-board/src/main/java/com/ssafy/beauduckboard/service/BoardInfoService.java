package com.ssafy.beauduckboard.service;

import com.ssafy.beauduckboard.dto.info.BoardInfoRequestDto;
import com.ssafy.beauduckboard.dto.info.BoardInfoResponseDto;
import com.ssafy.beauduckboard.entity.info.BoardInfoEntity;
import com.ssafy.beauduckboard.repository.info.BoardInfoRepository;
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
//    public String insert(BoardInfoRequestDto dto) {
//        System.out.println(dto.getTitle());
//        BoardInfoEntity board = boardInfoRepository.save(dto.toEntity());
//        System.out.println(board.getTitle());
//        if(board == null) return false;
//        return true;
//    }

    public int insert(BoardInfoRequestDto dto) {
        System.out.println(dto.getTitle());
        BoardInfoEntity board = boardInfoRepository.save(dto.toEntity());
        return board.getId();
    }

    //게시글 상세보기
    @Transactional
    public BoardInfoResponseDto selectOne(int id) {
        Optional<BoardInfoEntity> board = boardInfoRepository.findById(id);
        BoardInfoEntity newBoard = board.get();
        newBoard.updateCount(newBoard.getCount()+1);

        BoardInfoResponseDto dto = BoardInfoResponseDto.builder()
                .id(id)
                .memberEntity(newBoard.getMemberEntity())
                .writer(newBoard.getWriter())
                .isActive(newBoard.getIsActive())
                .title(newBoard.getTitle())
                .content(newBoard.getContent())
                .count(newBoard.getCount())
                .likes(newBoard.getLikes())
                .createdDate(newBoard.getCreated_date())
                .updatedDate(newBoard.getUpdated_date())
                .memberId(newBoard.getMemberEntity().getMemberId())
                .build();
        return dto;
    }

    //게시글 전체보기
    public List<BoardInfoResponseDto> selectAll() {
        List<BoardInfoEntity> boards = boardInfoRepository.findAllByIsActive(true);
        List<BoardInfoResponseDto> boardList = new ArrayList<>();

        for(BoardInfoEntity e: boards) {
            BoardInfoResponseDto dto = BoardInfoResponseDto.builder()
                    .id(e.getId())
                    .memberEntity(e.getMemberEntity())
                    .writer(e.getWriter())
                    .isActive(e.getIsActive())
                    .title(e.getTitle())
                    .content(e.getContent())
                    .count(e.getCount())
                    .likes(e.getLikes())
                    .createdDate(e.getCreated_date())
                    .updatedDate(e.getUpdated_date())
                    .memberId(e.getMemberEntity().getMemberId())
                    .build();
            boardList.add(dto);
        }
        return boardList;
    }

    //게시글 수정
    @Transactional
    public boolean update(int id, String title, String content) {
        Optional<BoardInfoEntity> board = boardInfoRepository.findById(id);
        return board.get().update(title, content);
    }

    @Transactional
    public boolean delete(int id) {
        Optional<BoardInfoEntity> board = boardInfoRepository.findById(id);
        return board.get().delete();
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
