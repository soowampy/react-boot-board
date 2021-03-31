package com.malgn.board.common.jwt;

import com.malgn.board.common.jwt.domain.CustomUser;
import com.malgn.board.domain.member.Member;
import com.malgn.board.domain.member.MemberAuth;
import com.malgn.board.mapper.member.MemberMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private MemberMapper memberMapper;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        Member member = memberMapper.getFindById(userName);

        List<MemberAuth> mList = new ArrayList<>();
        MemberAuth mAuth = new MemberAuth();

        if(member!=null){
            mAuth.setAuth(member.getType());
            mAuth.setUserNo(member.getmNo());
            member.setAuthList(mList);
        }


        return member == null ? null : new CustomUser(member);
    }

}
