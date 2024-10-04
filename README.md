ERD
https://www.erdcloud.com/d/qk3BTwxEhKcm3WGug

1. typescript init

tsc --init

tsconfig.json 설정하기
  ㄴ target : 자바스크립트 컴파일 버전 설정 변경 : ES6
  ㄴ rootDir : 파일 읽을 경로 설정 변경
  ㄴ outDir : 컴파일 후 생성할 파일 경로 설정
  ㄴ moduleResolution 주석 제거

2. npm init
3. npm i express
4. npm i -D typescript ts-node nodemon @types/node @types/express;


- 기능 구현
  - 회원
    - 기본
      - 로그인        
      - 회원가입
        - bcrypt 으로 비밀번호 인코딩
        - jwt (access token , refresh_token) 사용
  
  - 관리자
    - 기본
      - 로그인
      - 회원가입
        - bcrypt 으로 비밀번호 인코딩
        - jwt (access token , refresh_token) 사용
