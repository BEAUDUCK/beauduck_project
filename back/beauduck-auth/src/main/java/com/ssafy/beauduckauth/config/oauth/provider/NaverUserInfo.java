package com.ssafy.beauduckauth.config.oauth.provider;

import java.time.LocalDate;
import java.util.Map;

public class NaverUserInfo implements  OAuth2UserInfo{

    private Map<String, Object> attributes; // oauth2User.getAttributes()

    public NaverUserInfo(Map<String, Object> attributes){
        this.attributes = attributes;
    }

    @Override
    public String getProviderId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getProvider() {
        return "naver";
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getSex() {
        return (String) attributes.get("gender");
    }

    @Override
    public int getAge() {
        int birthYear = Integer.parseInt((String) attributes.get("birthyear"));
        int nowYear = LocalDate.now().getYear();
        return nowYear - birthYear;
    }

    @Override
    public String getPhone() {
        return (String) attributes.get("mobile");
    }
}
