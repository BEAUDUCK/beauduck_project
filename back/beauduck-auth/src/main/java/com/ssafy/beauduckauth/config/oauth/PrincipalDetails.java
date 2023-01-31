package com.ssafy.beauduckauth.config.oauth;

import com.ssafy.beauduckauth.entity.MemberEntity;
import com.ssafy.beauduckauth.entity.MemberInfoEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

public class PrincipalDetails implements OAuth2User {

    private MemberInfoEntity memberInfoEntity; //컴포지션
    private Map<String, Object> attributes;

    // OAuth 로그인
    public PrincipalDetails(MemberInfoEntity memberInfoEntity, Map<String, Object> attributes){
        this.memberInfoEntity = memberInfoEntity;
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getName() {
        return null;
    }


}
