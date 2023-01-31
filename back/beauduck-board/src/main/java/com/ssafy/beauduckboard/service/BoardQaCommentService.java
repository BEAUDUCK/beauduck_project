package com.ssafy.beauduckboard.service;

import com.ssafy.beauduckboard.dto.qa.BoardQaCommentRequestDto;
import com.ssafy.beauduckboard.dto.qa.BoardQaCommentResponseDto;
import com.ssafy.beauduckboard.entity.qa.BoardQaCommentEntity;
import com.ssafy.beauduckboard.repository.BoardQaCommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoardQaCommentService {

    private final BoardQaCommentRepository boardQaCommentRepository;

    @Transactional
    public boolean insert(BoardQaCommentRequestDto boardQaCommentRequestDto){

        BoardQaCommentEntity commentQaEntity = boardQaCommentRepository.save(boardQaCommentRequestDto.ToEntity());
        if (commentQaEntity == null){
            return false;
        }else return true;
    }


    @Transactional
    public List<BoardQaCommentResponseDto> selectAll(int id){
        List<BoardQaCommentEntity> commentQaEntities = boardQaCommentRepository.findAllByIsActive(true);
        List<BoardQaCommentResponseDto> commentQaList = new ArrayList<>();

        for(BoardQaCommentEntity comment : commentQaEntities){
            if (comment.getBoardQaEntity().getId() != id) continue;
            BoardQaCommentResponseDto commentDto = BoardQaCommentResponseDto.builder()
                    .id(comment.getId())
                    .boardQaEntity(comment.getBoardQaEntity())
                    .memberEntity(comment.getMemberEntity())
                    .writer(comment.getWriter())
                    .isActive(comment.getIsActive())
                    .likes(comment.getLikes())
                    .content(comment.getContent())
                    .created_date(comment.getCreated_date())
                    .updated_date(comment.getUpdated_date())
                    .memberId(comment.getMemberEntity().getMemberId())
                    .build();
            commentQaList.add(commentDto);
        }
        return commentQaList;
    }


    @Transactional
    public boolean update(int id, BoardQaCommentRequestDto boardQaCommentRequestDto){
        Optional<BoardQaCommentEntity> byId = boardQaCommentRepository.findById(id);
        BoardQaCommentEntity commentQaEntity = byId.get();
        return commentQaEntity.updateComment(boardQaCommentRequestDto.getContent());
    }

    @Transactional
    public boolean delete(int id){
        Optional<BoardQaCommentEntity> byId = boardQaCommentRepository.findById(id);
        BoardQaCommentEntity commentQaEntity = byId.get();
        if (commentQaEntity.getId() == 0) return false;
        return commentQaEntity.deleteComment();
    }

}
