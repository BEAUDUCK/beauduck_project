package com.ssafy.beauduckboard.service;

import com.ssafy.beauduckboard.dto.qa.CommentQaRequestDto;
import com.ssafy.beauduckboard.dto.qa.CommentQaResponseDto;
import com.ssafy.beauduckboard.entity.BoardQaCommentEntity;
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
    public boolean insert(CommentQaRequestDto commentQaRequestDto){

        BoardQaCommentEntity commentQaEntity = boardQaCommentRepository.save(commentQaRequestDto.ToEntity());
        if (commentQaEntity == null){
            return false;
        }else return true;
    }


    @Transactional
    public List<CommentQaResponseDto> selectAll(int id){
        List<BoardQaCommentEntity> commentQaEntities = boardQaCommentRepository.findAllByIsActive(true);
        List<CommentQaResponseDto> commentQaList = new ArrayList<>();

        for(BoardQaCommentEntity comment : commentQaEntities){
            if (comment.getBoardQaEntity().getId() != id) continue;
            CommentQaResponseDto commentDto = CommentQaResponseDto.builder()
                    .id(comment.getId())
                    .boardQaEntity(comment.getBoardQaEntity())
                    .memberId(comment.getMemberId())
                    .writer(comment.getWriter())
                    .isActive(comment.getIsActive())
                    .likes(comment.getLikes())
                    .content(comment.getContent())
                    .created_date(comment.getCreated_date())
                    .updated_date(comment.getUpdated_date())
                    .build();
            commentQaList.add(commentDto);
        }
        return commentQaList;
    }


    @Transactional
    public boolean update(int id, CommentQaRequestDto commentQaRequestDto){
        Optional<BoardQaCommentEntity> byId = boardQaCommentRepository.findById(id);
        BoardQaCommentEntity commentQaEntity = byId.get();
        return commentQaEntity.updateComment(commentQaRequestDto.getContent());
    }

    @Transactional
    public boolean delete(int id){
        Optional<BoardQaCommentEntity> byId = boardQaCommentRepository.findById(id);
        BoardQaCommentEntity commentQaEntity = byId.get();
        if (commentQaEntity.getId() == 0) return false;
        return commentQaEntity.deleteComment();
    }

}
