package com.ssafy.beauduckauth.config.oauth.provider;

public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
    String getEmail();
    String getName();
    String getSex();
    int getAge();

    String getPhone();
}
