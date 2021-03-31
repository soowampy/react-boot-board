

## 🖼이미지 관리 어플리케이션🖼
   1. 작업기간
      - 2020.11.23 ~ 2021. 02. 17
      
   2. 기술 스택
      - Backend
         - java 11, Spring boot 2.4.0
         - RESTful API
         - Oracle 11g, MyBatis
      - Frontend
         - React.js
         - Redux, ReduxSaga
         - TypeScript
         
   3. 설계의 중점
      - Spring Security : JWT 방식의 인증 방식을 사용, Bcrypt를 사용해 사용자 패스워드 암호화
      - Spring AOP : 예외처리
      - Restful API : URI, Response 객체 커스터마이징을 통해 공통된 표준 형식의 통합 인터페이스 설계에 중점을 둠
      - Redux를 통한 상태 관리, TypeScript를 통한 타입 규정
      
   4. 기능
      - 이미지 CRUD
      - 관리자(spring security로 권한 부여) : 회원관리 CRUD, 카테고리 CRUD
      
   5. 프로젝트 후기
      - 역시 웹개발에서 기술 익히기에 최강은 게시판이라는 걸 다시 한 번 느끼게 되었다.. 빨리 작업할 수 있을 줄 알았는데 초반에 삽질을 너무 많이했다 설계의 중요성..
      - RESTful 많이 미숙했다 특히 예외처리 하는 부분은... 다시 손 봐야 할 것 같다
      - 타입스크립트 제대로 하자 !!
