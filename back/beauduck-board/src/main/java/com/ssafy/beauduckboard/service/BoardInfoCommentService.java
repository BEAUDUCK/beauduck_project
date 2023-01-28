package com.ssafy.beauduckboard.service;

import com.ssafy.beauduckboard.dto.info.BoardInfoCommentRequestDto;
import com.ssafy.beauduckboard.dto.info.BoardInfoCommentResponseDto;
import com.ssafy.beauduckboard.entity.BoardInfoCommentEntity;
import com.ssafy.beauduckboard.repository.BoardInfoCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardInfoCommentService {
    @Autowired
    BoardInfoCommentRepository boardInfoCommentRepository;

    //댓글 작성
    public int insert(BoardInfoCommentRequestDto dto) {
        BoardInfoCommentEntity cmt = boardInfoCommentRepository.save(dto.toEntity());
        return cmt.getId();
    }

    //댓글 목록보기
//    public List<BoardInfoCommentResponseDto> selectAll(int id) {
//        List<BoardInfoCommentEntity> comments = boardInfoCommentRepository.findAllById();
//        List<BoardInfoCommentResponseDto> cmtList = new ArrayList<>();
//
//        for(BoardInfoCommentEntity e: comments) {
//            BoardInfoCommentResponseDto dto = BoardInfoCommentResponseDto.builder()
//                    .id(e.getId())
//                    .memberId(e.getMemberId())
//                    .writer(e.getWriter())
//                    .content(e.getContent())
//                    .likes(e.getLikes())
//                    .createdDate(e.getCreated_date())
//                    .updatedDate(e.getUpdated_date())
//                    .build();
//            cmtList.add(dto);
//        }
//        return cmtList;
//    }

    //댓글 수정
    @Transactional
    public int update(int id, BoardInfoCommentRequestDto dto) {
        Optional<BoardInfoCommentEntity> cmt = boardInfoCommentRepository.findById(id);
        return cmt.get().update(id, dto);
    }
}
