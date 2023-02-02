package com.ssafy.beauduckboard.service;

import com.ssafy.beauduckboard.dto.info.BoardInfoCommentRequestDto;
import com.ssafy.beauduckboard.dto.info.BoardInfoCommentResponseDto;
import com.ssafy.beauduckboard.entity.info.BoardInfoCommentEntity;
import com.ssafy.beauduckboard.repository.info.BoardInfoCommentRepository;
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
    public boolean insert(BoardInfoCommentRequestDto dto) {
        BoardInfoCommentEntity cmt = boardInfoCommentRepository.save(dto.toEntity());
        if(cmt == null) return false;
        return true;
    }

    //댓글 목록보기
    public List<BoardInfoCommentResponseDto> selectAll(int id) {
        List<BoardInfoCommentEntity> comments = boardInfoCommentRepository.findAllByIsActive(true);
        List<BoardInfoCommentResponseDto> cmtList = new ArrayList<>();

        for(BoardInfoCommentEntity e: comments) {
            if(e.getBoardInfoEntity().getId() != id) continue;
            BoardInfoCommentResponseDto dto = BoardInfoCommentResponseDto.builder()
                    .id(e.getId())
                    .memberEntity(e.getMemberEntity())
                    .writer(e.getWriter())
                    .content(e.getContent())
                    .likes(e.getLikes())
                    .createdDate(e.getCreated_date())
                    .updatedDate(e.getUpdated_date())
                    .memberId(e.getMemberEntity().getMemberId())
                    .build();
            cmtList.add(dto);
        }
        return cmtList;
    }

    //댓글 수정
    @Transactional
    public boolean update(int id, String content) {
        Optional<BoardInfoCommentEntity> cmt = boardInfoCommentRepository.findById(id);
        return cmt.get().update(content);
    }

    @Transactional
    public boolean delete(int id) {
        Optional<BoardInfoCommentEntity> cmt = boardInfoCommentRepository.findById(id);
        return cmt.get().delete();
    }

}
