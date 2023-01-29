package com.ssafy.beauduckauth.controller;

import com.ssafy.beauduckauth.config.oauth.PrincipalDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.security.Principal;

@RestController
public class MemberController {

    @GetMapping("/login")
    public @ResponseBody String login(@AuthenticationPrincipal PrincipalDetails principalDetails){
        System.out.println("login Controller");
//        System.out.println("authentication : " + principalDetails.getAttributes());

        return "TEST";
    }

    @GetMapping("/logout/success")
    public @ResponseBody String logout(HttpSession session){
        session.invalidate();
        return "logout page";
    }
}
