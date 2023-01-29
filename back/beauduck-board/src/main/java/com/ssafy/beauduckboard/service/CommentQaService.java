package com.ssafy.beauduckboard.service;

import com.ssafy.beauduckboard.dto.qa.BoardQaRequestDto;
import com.ssafy.beauduckboard.dto.qa.BoardQaResponseDto;
import com.ssafy.beauduckboard.dto.qa.CommentQaRequestDto;
import com.ssafy.beauduckboard.dto.qa.CommentQaResponseDto;
import com.ssafy.beauduckboard.entity.BoardQaEntity;
import com.ssafy.beauduckboard.entity.CommentQaEntity;
import com.ssafy.beauduckboard.repository.CommentQaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentQaService {

    private final CommentQaRepository commentQaRepository;

    @Transactional
    public boolean createComment(CommentQaRequestDto commentQaRequestDto){

        CommentQaEntity commentQaEntity = commentQaRepository.save(commentQaRequestDto.ToEntity());
        if (commentQaEntity == null){
            return false;
        }else return true;
    }


    @Transactional
    public List<CommentQaResponseDto> readCommentList(int id){
        List<CommentQaEntity> commentQaEntities = commentQaRepository.findAllByIsActive(true);
        List<CommentQaResponseDto> commentQaList = new ArrayList<>();

        for(CommentQaEntity comment : commentQaEntities){
            if (comment.getBoardQaEntity().getBoardId() != id) continue;
            CommentQaResponseDto commentDto = CommentQaResponseDto.builder()
                    .commentQaId(comment.getCommentQaId())
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
    public boolean updateComment(int id, CommentQaRequestDto commentQaRequestDto){
        Optional<CommentQaEntity> byId = commentQaRepository.findById(id);
        CommentQaEntity commentQaEntity = byId.get();
        return commentQaEntity.updateComment(commentQaRequestDto.getContent());
    }

    @Transactional
    public boolean deleteComment(int id){
        Optional<CommentQaEntity> byId = commentQaRepository.findById(id);
        CommentQaEntity commentQaEntity = byId.get();
        if (commentQaEntity.getCommentQaId() == 0) return false;
        return commentQaEntity.deleteComment();
    }

}
