package com.malgn.board.service.member;

import com.malgn.board.mapper.member.MemberMapper;
import com.malgn.board.domain.member.Member;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class MemberService implements UserDetailsService {

    private final MemberMapper memberMapper;
    public MemberService(MemberMapper memberMapper){
        this.memberMapper=memberMapper;
    }


    // 유저 입력 (미구현)
    public void joinUser(Member member) {
        // 비밀번호 암호화
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        memberMapper.insertMember(member);
    }

    // id로 유저 정보 갖고오기
    public Member loadUser(String id) throws UsernameNotFoundException {
        Member member =memberMapper.getFindById(id);
        return member;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return null;
    }
}
