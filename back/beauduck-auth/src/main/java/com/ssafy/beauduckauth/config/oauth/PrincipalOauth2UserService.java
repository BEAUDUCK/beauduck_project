package com.ssafy.beauduckauth.config.oauth;

import com.ssafy.beauduckauth.config.oauth.provider.NaverUserInfo;
import com.ssafy.beauduckauth.config.oauth.provider.OAuth2UserInfo;
import com.ssafy.beauduckauth.entity.MemberEntity;
import com.ssafy.beauduckauth.entity.MemberInfoEntity;
import com.ssafy.beauduckauth.repository.member.MemberInfoRepository;
import com.ssafy.beauduckauth.repository.member.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private MemberInfoRepository memberInfoRepository;

    // 로그인 진행 후, 후처리 진행되는 메서드
    // 네이버로부터 받은 userRequest 데이터에 대한 후처리되는 함수
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("getClientRegistration : " + userRequest.getClientRegistration()); // registrationId로 어떤 OAuth로 로그인했는지 확인
        System.out.println("getAccessToken : " + userRequest.getAccessToken().getTokenValue());


        OAuth2User oAuth2User = super.loadUser(userRequest);
        // 구글 로그인 버튼 클릭 -> 구글로그인창 -> 로그인을 완료 -> code 리턴(OAuth-Client라이브러리) -> AccessToken 요청
        // userRequest 정보 -> loadUser함수 -> 구글로부터 회원 프로필 받아줌
        System.out.println("getAttributes : " + oAuth2User.getAttributes());

        // 회원가입 강제 진행
        OAuth2UserInfo oAuth2UserInfo = null;
        if (userRequest.getClientRegistration().getRegistrationId().equals("naver")) {
            System.out.println("naver 로그인 요청");
            oAuth2UserInfo = new NaverUserInfo((Map) oAuth2User.getAttributes().get("response"));
        } else {
            System.out.println("우리는 Naver 로그인만 지원합니다");
        }

        String providerId = oAuth2UserInfo.getProviderId();
        String provider = oAuth2UserInfo.getProvider();
        String socialCode = oAuth2UserInfo.getProviderId();
        String username = oAuth2UserInfo.getName();
        String email = oAuth2UserInfo.getEmail();
        int age = oAuth2UserInfo.getAge();
        String sex = oAuth2UserInfo.getSex();
        String phoneNumber = oAuth2UserInfo.getPhone();
        String accessToken = userRequest.getAccessToken().getTokenValue();


        MemberInfoEntity memberInfoEntity = memberInfoRepository.findByEmail(email).orElseGet(() -> {
            System.out.println("회원가입 시작");
            MemberEntity memberEntity = MemberEntity.builder()
                    .id(providerId)
                    .provider(provider)
                    .build();
            memberRepository.save(memberEntity);

            MemberInfoEntity entity = MemberInfoEntity.builder()
                    .memberEntity(memberEntity)
                    .username(username)
                    .phoneNumber(phoneNumber)
                    .email(email)
                    .age(age)
                    .sex(sex)
                    .accessToken(accessToken)
                    .socialCode(socialCode)
                    .externalId(socialCode)
                    .build();
            memberInfoRepository.save(entity);
            System.out.println("save member info");
            return entity;
        });

        System.out.println(memberInfoEntity.getMemberEntity().getId());
        System.out.println(memberInfoEntity.getEmail());
        return new PrincipalDetails(memberInfoEntity, oAuth2User.getAttributes());
    }

}
