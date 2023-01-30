package com.ssafy.beauduckauth.controller;

import com.google.common.net.HttpHeaders;
import com.ssafy.beauduckauth.service.AuthService;
import com.sun.mail.iap.Response;
import lombok.RequiredArgsConstructor;
import net.minidev.json.JSONObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.LocalDate;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/naver")
public class OAuthController {

    private final AuthService authService;

    @GetMapping("/oauth")
    public String naverConnect() {
        StringBuffer url = new StringBuffer();
        url.append("client_id=" + "V5gN96q3kFtGfUK7PUds");
        url.append("&response_type=code");
        url.append("&redirect_uri=http://localhost:3000/Api/Naver");
//        url.append("&redirect_uri=http://localhost:8080/login/oauth2/code/naver");
        url.append("$state=STATE_STRING");
        System.out.println(url.toString());
//        return url.toString();
        return "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=V5gN96q3kFtGfUK7PUds&state=STATE_STRING&redirect_uri=http://localhost:3000/Api/Naver";
    }

    @GetMapping("/callback")
    public ResponseEntity getAccessToken(@RequestParam(value = "code") String code, @RequestParam(value = "state") String state) {
        return ResponseEntity.ok(authService.getToken(code, state));
    }

    @GetMapping("/refresh")
    public ResponseEntity naverRefresh(@RequestParam(value = "refreshToken") String refreshToken){
        return ResponseEntity.ok(authService.getRefreshToken(refreshToken));
    }

    @GetMapping("/login")
    public ResponseEntity login(@RequestParam("accessToken") String accessToken) {
        return ResponseEntity.ok(authService.login(accessToken));
    }

    @GetMapping("/logout")
    public ResponseEntity logout(@RequestParam("accessToken") String accessToken){
        return ResponseEntity.ok(authService.logout(accessToken));
    }
}
