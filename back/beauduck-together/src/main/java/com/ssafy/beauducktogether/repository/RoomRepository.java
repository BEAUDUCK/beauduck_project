package com.ssafy.beauducktogether.repository;


import com.ssafy.beauducktogether.dto.RoomDto;
import com.ssafy.beauducktogether.dto.UserInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Repository
public class RoomRepository {
    private final RedisTemplate redisTemplate;
    private static final String TO_ROOMS = "TO_ROOMS_TOGETHER"; // 룸 저장
    public static final String ENTER_INFO = "ENTER_INFO_TOGETHER"; // 룸에 입장한 사용자의 sessionId(사용자 id)와 룸 id를 맵핑한 정보 저장

    // HashOperations<table, dto key, dto 객체>
    @Resource(name = "redisTemplate")
    private HashOperations<String, String, RoomDto> hashOpsRoom;  // 방 ("TO_ROOM", 방 id, room 객체)
    @Resource(name = "redisTemplate")
    private HashOperations<String, String, UserInfoDto> hashOpsEnterInfo;  // 방 유저 정보("ENTER_INFO", 세션 id (유저 id), 유저 객체)


    // 모든 미팅방 조회
    public List<RoomDto> findAllRoom() {
        return hashOpsRoom.values(TO_ROOMS);
//        return hashOpsRoom.values((String)redisTemplate.opsForValue().get(TO_ROOMS));
    }

    // 채방 생성 : 서버간 미팅방 공유를 위해 redis hash에 저장한다.
    public boolean createRoom(RoomDto roomDto, UserInfoDto userInfoDto) {
        hashOpsRoom.put(TO_ROOMS, roomDto.getRoomId(), roomDto);
        hashOpsEnterInfo.put(ENTER_INFO, roomDto.getHostId(), userInfoDto);
//        hashOpsChatRoom.getOperations().expire(roomDto.getRoomId(),5, TimeUnit.SECONDS);
//        this.setData(TO_ROOMS, roomDto.getRoomId(), 10L);
        redisTemplate.expire(TO_ROOMS, 24, TimeUnit.HOURS);

        return true;
    }

    // 방 삭제 : redis hash에 저장된 미팅방 파괴
    public boolean deleteRoom(String roomId) {
        // 방 정보 삭제
        hashOpsRoom.delete(TO_ROOMS, roomId);

        // hashOpsEnterInfo(미팅방 유저 정보)에서 미팅방 ID를 value으로 가지는 key를 삭제
        Map<String, UserInfoDto> entries = hashOpsEnterInfo.entries(ENTER_INFO);
        for (Map.Entry<String, UserInfoDto> stringStringEntry : entries.entrySet()) { // 매핑된 정보를 전체 출력 == entrySet
            if (stringStringEntry.getValue().getRoomId().equals(roomId)) { // roomID랑
                hashOpsEnterInfo.delete(ENTER_INFO, stringStringEntry.getKey()); //
            }
        }

        return true;
    }

    public RoomDto findRoomById(String id) {
        return hashOpsRoom.get(TO_ROOMS, id);
    }

    // 방 유저 입장
    public Boolean setUserEnterInfo(String sessionId, UserInfoDto userInfoDto, RoomDto roomDto) {
        hashOpsEnterInfo.put(ENTER_INFO, sessionId, userInfoDto);
        hashOpsRoom.put(TO_ROOMS, roomDto.getRoomId(), roomDto);
        return true;
    }

    // 방 유저 퇴장
    public Boolean removeUserEnterInfo(String sessionId, UserInfoDto userInfoDto, RoomDto roomDto) {
        hashOpsEnterInfo.delete(ENTER_INFO, sessionId);
        hashOpsRoom.put(TO_ROOMS, roomDto.getRoomId(), roomDto);
        return true;
    }

}
