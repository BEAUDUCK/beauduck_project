package com.ssafy.beauduckauth.service;

import com.google.common.net.HttpHeaders;
import com.ssafy.beauduckauth.dto.auth.*;
import com.ssafy.beauduckauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.beauduckauth.entity.member.MemberEntity;
import com.ssafy.beauduckauth.entity.member.MemberInfoEntity;
import com.ssafy.beauduckauth.entity.member.MemberProfileEntity;
import com.ssafy.beauduckauth.errorhandling.exception.service.DuplicateErrorException;
import com.ssafy.beauduckauth.errorhandling.exception.service.EntityIsNullException;
import com.ssafy.beauduckauth.errorhandling.exception.service.LoginErrorException;
import com.ssafy.beauduckauth.errorhandling.exception.service.SignupErrorException;
import com.ssafy.beauduckauth.repository.member.MemberInfoRepository;
import com.ssafy.beauduckauth.repository.member.MemberProfileRepository;
import com.ssafy.beauduckauth.repository.member.MemberRepository;
import com.ssafy.beauduckauth.util.ResponseUtil;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final ResponseUtil responseUtil;
    private final MemberRepository memberRepository;
    private final MemberInfoRepository memberInfoRepository;
    private final MemberProfileRepository memberProfileRepository;

    public ResponseSuccessDto<TokenResponseDto> getToken(String code, String state) {
        JSONObject response = getJsonObjectByCode(code, state);

        System.out.println("토큰 발급");
        System.out.println("getToken method");
        System.out.println("code = " + code);
        System.out.println("state = " + state);
        System.out.println("accessToken = " + (String) response.get("access_token"));
        TokenResponseDto tokenResponseDto = TokenResponseDto.builder()
                .accessToken((String) response.get("access_token"))
                .refreshToken((String) response.get("refresh_token"))
                .tokenType((String) response.get("token_type"))
                .expiresIn(Integer.parseInt((String) response.get("expires_in")))
                .build();

        ResponseSuccessDto<TokenResponseDto> res = responseUtil.successResponse(tokenResponseDto);
        return res;
    }

    public ResponseSuccessDto<TokenResponseDto> getRefreshToken(String refreshToken) {
        System.out.println("리프레쉬 토큰 발급");
        WebClient webClient = WebClient
                .builder()
                .baseUrl("https://nid.naver.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        JSONObject response = webClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/oauth2.0/token")
                        .queryParam("client_id", "V5gN96q3kFtGfUK7PUds")
                        .queryParam("client_secret", "Z2RNeixHZU")
                        .queryParam("refresh_token", refreshToken)
                        .queryParam("grant_type", "refresh_token")
                        .build())
                .retrieve().bodyToMono(JSONObject.class).block();

        System.out.println(response.toString());

        TokenResponseDto tokenResponseDto = TokenResponseDto.builder()
                .accessToken((String) response.get("access_token"))
                .refreshToken((String) response.get("refresh_token"))
                .tokenType((String) response.get("token_type"))
                .expiresIn(Integer.parseInt((String) response.get("expires_in")))
                .build();

        ResponseSuccessDto<TokenResponseDto> res = responseUtil.successResponse(tokenResponseDto);
        return res;
    }

    public ResponseSuccessDto<LoginResponseDto> login(String accessToken) {
        System.out.println("로그인 시작");
        System.out.println("before accessToken = " + accessToken);
        accessToken.replace(" ", "[+]");
        System.out.println("after accessToken = " + accessToken);
        JSONObject response = getJsonObjectByToken(accessToken);
        Map<String, Object> res = (Map<String, Object>) response.get("response");

        System.out.println("회원정보");
        System.out.println(res.toString());
        String id = (String) res.get("id");
        String name = (String) res.get("name");

        System.out.println("find MemberEntity");
        MemberEntity memberEntity = memberRepository.findById(id).orElseThrow(() -> new LoginErrorException("등록되지 않은 회원입니다."));
        System.out.println("MemberEntity = " + memberEntity.toString());

        System.out.println("find MemberProfileEntity");
        MemberProfileEntity memberProfileEntity = memberProfileRepository.findByMemberEntity(memberEntity).orElseThrow(() -> new EntityIsNullException("회원의 프로필이 존재하지 않습니다."));
        System.out.println("MemberProfileEntity = " + memberProfileEntity.toString());

        System.out.println("find MemberInfoEntity");
        MemberInfoEntity memberInfoEntity = memberInfoRepository.findByMemberEntity(memberEntity).orElseThrow(() -> new EntityIsNullException("회원의 정보가 존재하지 않습니다."));
        System.out.println("MemberInfoEntity = " + memberInfoEntity.toString());

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .memberId(id)
                .name(name)
                .nickName(memberProfileEntity.getNickName())
                .email(memberInfoEntity.getEmail())
                .sex(memberInfoEntity.getSex())
                .phoneNumber(memberInfoEntity.getPhoneNumber())
                .build();

        return responseUtil.successResponse(loginResponseDto);
    }

    public ResponseSuccessDto<TokenDeleteResponseDto> logout(String accessToken) {
        System.out.println("로그아웃");
        WebClient webClient = WebClient
                .builder()
                .baseUrl("https://nid.naver.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        JSONObject response = webClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/oauth2.0/token")
                        .queryParam("client_id", "V5gN96q3kFtGfUK7PUds")
                        .queryParam("client_secret", "Z2RNeixHZU")
                        .queryParam("grant_type", "delete")
                        .queryParam("service_provider", "NAVER")
                        .queryParam("access_token", accessToken).build())
                .retrieve().bodyToMono(JSONObject.class).block();


        System.out.println("logout response = " + response.toString());
        TokenDeleteResponseDto tokenDeleteResponseDto = TokenDeleteResponseDto.builder()
                .accessToken((String) response.get("access_token"))
                .result((String) response.get("result"))
                .build();

        ResponseSuccessDto<TokenDeleteResponseDto> res = responseUtil.successResponse(tokenDeleteResponseDto);
        return res;
    }

    public ResponseSuccessDto<SignupResponseDto> signup(SignupRequestDto signupRequestDto) {
        System.out.println("회원가입 시작");
//        if (img == null) {
//            throw new SignupErrorException("이미지를 업로드할 수 없습니다.");
//        }

        String accessToken = signupRequestDto.getAccessToken();
        JSONObject response = getJsonObjectByToken(accessToken);
        Map<String, Object> res = (Map<String, Object>) response.get("response");

        System.out.println("Signup method");
        System.out.println(res.toString());
        String id = (String) res.get("id");
        String provider = "naver";
        String name = (String) res.get("name");
        /**
         * 임의 데이터
         */
        String email = "test@naver.com";
        String sex = "m";
        String phone = "010-1234-1234";
        String nickName = signupRequestDto.getNickName();
        String content = signupRequestDto.getContent();

        Optional<MemberEntity> findById = memberRepository.findById(id);
        if (findById.isPresent()) {
            throw new SignupErrorException("이미 존재하는 회원입니다.");
        }

        if (memberProfileRepository.existsByNickName(nickName)) {
            throw new DuplicateErrorException("중복된 닉네임입니다.");
        }

        MemberEntity entity = MemberEntity.builder()
                .id(id)
                .provider(provider)
                .build();
        memberRepository.save(entity);

        MemberInfoEntity memberInfoEntity = MemberInfoEntity.builder()
                .memberEntity(entity)
                .name(name)
                .email(email)
                .sex(sex)
                .phoneNumber(phone)
                .build();
        memberInfoRepository.save(memberInfoEntity);

        MemberProfileEntity memberProfileEntity = MemberProfileEntity.builder()
                .memberEntity(entity)
                .nickName(nickName)
                .img(null)
                .content(content)
                .exp(0)
                .badge("입덕")
                .isPrivate(false)
                .build();
        memberProfileRepository.save(memberProfileEntity);

        System.out.println("회원 등록 성공");
        SignupResponseDto signupResponseDto = SignupResponseDto.builder()
                .message("success")
                .build();

        return responseUtil.successResponse(signupResponseDto);
    }

    private static JSONObject getJsonObjectByCode(String code, String state) {
        WebClient webClient = WebClient
                .builder()
                .baseUrl("https://nid.naver.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        JSONObject response = webClient
                .get()
                .uri(uriBuilder -> uriBuilder
                        .path("/oauth2.0/token")
                        .queryParam("client_id", "V5gN96q3kFtGfUK7PUds")
                        .queryParam("client_secret", "Z2RNeixHZU")
                        .queryParam("grant_type", "authorization_code")
                        .queryParam("state", state)
                        .queryParam("code", code).build())
                .retrieve().bodyToMono(JSONObject.class).block();
        return response;
    }

    private static JSONObject getJsonObjectByToken(String accessToken) {
        WebClient webClient = WebClient
                .builder()
                .baseUrl("https://openapi.naver.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        JSONObject response = webClient
                .get()
                .uri(uriBuilder -> uriBuilder.path("/v1/nid/me")
                        .build())
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(JSONObject.class)
                .block();
        return response;
    }

}
