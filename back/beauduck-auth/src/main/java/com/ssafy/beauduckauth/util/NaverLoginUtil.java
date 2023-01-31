package com.ssafy.beauduckauth.util;

import org.springframework.security.oauth2.core.OAuth2AccessToken;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.UUID;


public class NaverLoginUtil {

    private final static String CLIENT_ID = "V5gN96q3kFtGfUK7PUds";
    private final static String CLIENT_SECRET = "Z2RNeixHZU";
    private final static String REDIRECT_URI = "http://localhost:3000/Api/Naver";
    private final static String SESSION_STATE = "STATE_STRING";

    /**
     * 프로필 조회 API URI
     */
//    public String getAuthorizationUrl(HttpSession session){
//
//    }

    /**
     * 세션 유효성 검증을 위한 난수 생성기
     */
    private String generateRandomString(){
        return UUID.randomUUID().toString();
    }

    /**
     * http session에 데이터 저장
     */
    private void setSession(HttpSession session, String state){
        session.setAttribute(SESSION_STATE, state);
    }

    /**
     * Access Token을 이용하여 네이버 사용자 프로필 API를 호출
     */
//    public String getUserProfile(OAuth2AccessToken oauthToken) throws IOException{
//        OAuth20Service oAuth20Service = new ServiceBuilder()
//                .apiKey(CLIENT_ID)
//                .apiSecret(CLIENT_SECRET)
//                .callback(REDIRECT_URI)
//                .st
//    }


    /**
     * http session에서 데이터 가져오기
     */
    private String getSession(HttpSession session){
        return (String) session.getAttribute(SESSION_STATE);
    }
}
