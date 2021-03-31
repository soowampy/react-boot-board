package com.malgn.board.common.provider;

import com.malgn.board.common.jwt.domain.CustomUser;
import com.malgn.board.domain.common.RestResponse;
import com.malgn.board.domain.member.Member;
import com.malgn.board.domain.member.MemberAuth;
import com.malgn.board.service.member.MemberService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.util.ArrayList;
import java.util.List;


public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private MemberService userDetailsService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;
        // AuthenticaionFilter에서 생성된 토큰으로부터 아이디와 비밀번호를 조회함
        String userId = token.getName();
        String userPw = (String) token.getCredentials();
        Member member = userDetailsService.loadUser(userId);

        // 아이디가 일치하지 않을 때
        if(member==null){
            return new UsernamePasswordAuthenticationToken(null, null, null);
            //throw new UsernameNotFoundException(userId);
        }

        //비밀번호가 일치하지 않았을 때
        if (!passwordEncoder.matches(userPw, member.getPassword())) {
            List<MemberAuth> temp = new ArrayList<>();
            member.setAuthList(temp);
            return new UsernamePasswordAuthenticationToken(new CustomUser(member), null, null);
        }

        String role = member.getType();
        List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority(role));
        List<MemberAuth> mList = new ArrayList<>();
        MemberAuth mAuth = new MemberAuth();

        if(member!=null){
            mAuth.setAuth(member.getType());
            mAuth.setUserNo(member.getmNo());
            member.setAuthList(mList);
        }

        return new UsernamePasswordAuthenticationToken(new CustomUser(member), userPw, authorityList);
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }


}