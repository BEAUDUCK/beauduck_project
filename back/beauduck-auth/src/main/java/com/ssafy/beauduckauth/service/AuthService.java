package com.ssafy.beauduckauth.service;

import com.google.common.net.HttpHeaders;
import com.ssafy.beauduckauth.dto.auth.LoginResponseDto;
import com.ssafy.beauduckauth.dto.auth.SignupRequestDto;
import com.ssafy.beauduckauth.dto.auth.TokenDeleteResponseDto;
import com.ssafy.beauduckauth.dto.auth.TokenResponseDto;
import com.ssafy.beauduckauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.beauduckauth.entity.member.MemberEntity;
import com.ssafy.beauduckauth.entity.member.MemberInfoEntity;
import com.ssafy.beauduckauth.entity.member.MemberProfileEntity;
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

import java.time.LocalDate;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final ResponseUtil responseUtil;
    private final MemberRepository memberRepository;
    private final MemberInfoRepository memberInfoRepository;
    private final MemberProfileRepository memberProfileRepository;

    public ResponseSuccessDto<TokenResponseDto> getToken(String code, String state){
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

    public ResponseSuccessDto<TokenResponseDto> getRefreshToken(String refreshToken){
        JSONObject response = getJsonObject(refreshToken);

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
        JSONObject response = getJsonObject(accessToken);


        Map<String, Object> res = (Map<String, Object>) response.get("response");

        System.out.println(res.toString());

        String id = (String) res.get("id");
        String provider = "naver";
        String email = (String) res.get("email");
        String name = (String) res.get("name");
        String sex = (String) res.get("gender");
        String phone = (String) res.get("mobile");
//        int birthYear = Integer.parseInt((String) res.get("birthyear"));
        int nowYear = LocalDate.now().getYear();
//        int age = nowYear - birthYear;

        MemberEntity memberEntity = memberRepository.findById(id).orElseGet(() -> {
            System.out.println("회원가입 시작");

            System.out.println("회원 등록 성공");
            return null;
        });

        LoginResponseDto loginResponseDto = LoginResponseDto.builder()
                .memberId(id)
                .name(name)
                .email(email)
                .sex(sex)
                .phoneNumber(phone)
                .build();

        return responseUtil.successResponse(loginResponseDto);
    }

    public ResponseSuccessDto<TokenDeleteResponseDto> logout(String accessToken){
        JSONObject response = getJsonObject(accessToken);

        System.out.println("logout response = " + response.toString());
        TokenDeleteResponseDto tokenDeleteResponseDto = TokenDeleteResponseDto.builder()
                .accessToken((String) response.get("access_token"))
                .result((String) response.get("result"))
                .build();

        ResponseSuccessDto<TokenDeleteResponseDto> res = responseUtil.successResponse(tokenDeleteResponseDto);
        return res;
    }

    public ResponseSuccessDto<Boolean> checkId(String accessToken){
        JSONObject response = getJsonObject(accessToken);

        Map<String, Object> res = (Map<String, Object>) response.get("response");

        System.out.println(res.toString());

        String id = (String) res.get("id");

        if(memberRepository.existsById(id)){
            responseUtil.successResponse(false);
        }
        return responseUtil.successResponse(true);
    }

    public ResponseSuccessDto<Boolean> signup(SignupRequestDto signupRequestDto){
        String accessToken = signupRequestDto.getAccessToken();
        JSONObject response = getJsonObject(accessToken);


        Map<String, Object> res = (Map<String, Object>) response.get("response");

        System.out.println(res.toString());

        String id = (String) res.get("id");
        String provider = "naver";
        String email = (String) res.get("email");
        String name = (String) res.get("name");
        String sex = (String) res.get("gender");
        String phone = (String) res.get("mobile");
        String nickName = signupRequestDto.getNickName();
        String content = signupRequestDto.getContent();
        String img = signupRequestDto.getImg();

        System.out.println("회원가입 시작");
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
                .accessToken(accessToken)
                .socialCode(id)
                .externalId("")
                .build();
        memberInfoRepository.save(memberInfoEntity);

        MemberProfileEntity memberProfileEntity = MemberProfileEntity.builder()
                .memberEntity(entity)
                .nickName(nickName)
                .img(img)
                .content(content)
                .exp(0)
                .badge(0)
                .isPrivate(false)
                .build();
        memberProfileRepository.save(memberProfileEntity);

        System.out.println("회원 등록 성공");
        return responseUtil.successResponse(true);
    }

    private static JSONObject getJsonObject(String accessToken) {
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
