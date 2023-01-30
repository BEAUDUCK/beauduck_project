package com.ssafy.beauduckauth.controller;

import com.google.common.net.HttpHeaders;
import com.ssafy.beauduckauth.util.NaverLoginUtil;
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
@RequestMapping("/naver")
public class OAuthController {

    @GetMapping("/auth")
    public String authNaver(@RequestParam("code") String code) {
        return code;
    }


    @GetMapping("/oauth")
    public String naverConnect() {
        StringBuffer url = new StringBuffer();
        url.append("client_id=" + "V5gN96q3kFtGfUK7PUds");
        url.append("&response_type=code");
        url.append("&redirect_uri=http://localhost:3000/Api/Naver");
//        url.append("&redirect_uri=http://localhost:8080/login/oauth2/code/naver");
        url.append("$state=STATE_STRING");
        System.out.println(url.toString());
        return url.toString();
    }

    @GetMapping("/callback")
    public ResponseEntity naverLogin(@RequestParam(value = "code") String code, @RequestParam(value = "state") String state) {
        WebClient webClient = WebClient.builder().baseUrl("https://nid.naver.com").defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build();

        JSONObject response = webClient.get().uri(uriBuilder -> uriBuilder.path("/oauth2.0/token").queryParam("client_id", "V5gN96q3kFtGfUK7PUds").queryParam("client_secret", "Z2RNeixHZU").queryParam("grant_type", "authorization_code").queryParam("state", state).queryParam("code", code).build()).retrieve().bodyToMono(JSONObject.class).block();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/info")
    public ResponseEntity getUserInfo(@RequestParam("accessToken") String accessToken) {
        System.out.println("accessToken = " + accessToken);
        WebClient webClient = WebClient.builder().baseUrl("https://openapi.naver.com").defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE).build();

        JSONObject response = webClient.get().uri(uriBuilder -> uriBuilder.path("/v1/nid/me").build()).header("Authorization", "Bearer " + accessToken).retrieve().bodyToMono(JSONObject.class).block();


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


        return ResponseEntity.ok(res.toString());
    }
}
