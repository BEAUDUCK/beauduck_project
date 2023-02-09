package com.ssafy.beauduckauth.controller;

import com.ssafy.beauduckauth.dto.auth.*;
import com.ssafy.beauduckauth.dto.common.response.ResponseSuccessDto;
import com.ssafy.beauduckauth.service.AuthService;
import com.ssafy.beauduckauth.service.AwsS3Service;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Api("회원 인증 컨트롤러 V1")
@RestController
@RequiredArgsConstructor
@RequestMapping("/naver")
public class OAuthController {

    private final AuthService authService;
    private final AwsS3Service awsS3Service;

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

    @ApiOperation(value = "토큰 발급", notes = "access, refresh token을 발급한다.", response = String.class)
    @GetMapping("/callback")
    public ResponseEntity<ResponseSuccessDto<TokenResponseDto>> getAccessToken(@RequestParam(value = "code") String code, @RequestParam(value = "state") String state) {
        return ResponseEntity.ok(authService.getToken(code, state));
    }

    @ApiOperation(value = "토큰 재발급", notes = "토큰 재발급을 한다.", response = String.class)
    @GetMapping("/refresh")
    public ResponseEntity<ResponseSuccessDto<TokenResponseDto>> naverRefresh(@RequestParam(value = "refreshToken") String refreshToken){
        return ResponseEntity.ok(authService.getRefreshToken(refreshToken));
    }

    @ApiOperation(value = "로그인", notes = "로그인을 진행한다.", response = String.class)
    @GetMapping("/login")
    public ResponseEntity<ResponseSuccessDto<LoginResponseDto>> login(@RequestParam("accessToken") String accessToken) {
        return ResponseEntity.ok(authService.login(accessToken));
    }

    @ApiOperation(value = "로그아웃", notes = "로그아웃을 진행한다. access token을 만료시킨다.", response = String.class)
    @GetMapping("/logout")
    public ResponseEntity<ResponseSuccessDto<TokenDeleteResponseDto>> logout(@RequestParam("accessToken") String accessToken){
        return ResponseEntity.ok(authService.logout(accessToken));
    }

    @ApiOperation(value = "회원가입", notes = "회원가입을 진행한다.")
    @PostMapping("/signup")
    public ResponseEntity<ResponseSuccessDto<SignupResponseDto>> signup(@RequestBody SignupRequestDto signupRequestDto) throws Exception {
        return ResponseEntity.ok(authService.signup(signupRequestDto));
    }
}
