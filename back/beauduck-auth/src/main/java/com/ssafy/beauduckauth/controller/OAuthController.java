package com.ssafy.beauduckauth.controller;

import com.ssafy.beauduckauth.config.oauth.PrincipalDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth")
public class OAuthController {

    @GetMapping("/loginInfo")
    public String oauthLoginInfo(@AuthenticationPrincipal PrincipalDetails principalDetails) {
        return principalDetails.getAttributes().toString();
    }
}
