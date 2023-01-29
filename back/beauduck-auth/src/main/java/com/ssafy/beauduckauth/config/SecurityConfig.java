package com.ssafy.beauduckauth.config;

import com.ssafy.beauduckauth.config.oauth.PrincipalOauth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록이 됨
//@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
// Controller 메서드에 직접 Role 부여 가능 ex) @Secured("ROLE_AUTH") 활성화 -> 권한 1개만 요구되는 경우
// preAuthorize, postAuthorize 어노테이션 활성화 -> 권한이 여러개 요구되는 경우
public class SecurityConfig {

    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
//                .antMatchers("/user/**").authenticated() //해당 url로 접속하려면 인증 필요
//                .antMatchers("/manager/**").access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')") //해당 url에 접속하려면 다음과 같은 권한 필요
                .anyRequest().permitAll()
                .and()
                .logout()
                .logoutUrl("/logout")
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessUrl("/oauth/loginInfo")
                .permitAll()
                // 그 외 모두 권한 허용
                .and().formLogin().loginPage("/login") //권한 없이 페이지 이동한 경우 /login으로 이동함
//        .loginProcessingUrl("/login") // /login 주소가 호출되면 시큐리티가 낚아채서 대신 로그인 진행
//        .defaultSuccessUrl("/"); // 로그인 성공 시, 이동 페이지, 원래 접근하고자 했던 페이지로 자동 이동
                .and()
                .oauth2Login()
        // 로그인 완료된 후, 후처리가 필요
                .userInfoEndpoint()
                .userService(principalOauth2UserService);


        return http.build();
    }
}
