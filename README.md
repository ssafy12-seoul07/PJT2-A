## 메인 페이지

**[헤더]**

- [ ] 로고는 누르면 "/"로 이동
- [ ] Home을 누르면 "/"로 이동
- [ ] 회원아이콘을 누르면 "/register"로 이동
- [ ] 들어가는 문 아이콘을 누르면 "/login"으로 이동
- [ ] 나가는 문 아이콘을 누르면 로그아웃 처리
- [ ] 로그인 전이라면 회원아이콘, 들어가는 문 아이콘만 노출
- [ ] 로그인 후라면 나가는 문 아이콘만 노출

**[최근 많이 본 영상]**

- [ ] 3개씩 캐러셀로 표시
- [ ] Autoplay 3s
- [ ] 카드 안에 썸네일과 제목, 파트, 채널명 표시
- [ ] 이동 화살표를 눌러서 페이지 이동
- [ ] 카드를 누르면 "/player/{id}"로 이동

**[운동 부위 선택]**

- [ ] 3개씩 캐러셀로 표시
- [ ] 파트별 버튼을 만들어서, 버튼을 누르면 관련 파트 동영상만 표시
- [ ] 카드 안에 썸네일과 제목, 파트, 채널명 표시
- [ ] 이동 화살표를 눌러서 페이지 이동
- [ ] 카드를 누르면 "/player/{id}"로 이동

## 영상 페이지

- [ ] 영상 페이지에 들어가면 비디오 id에 해당하는 db 생성
- [ ] 조회할 때마다 조회 수 증가
- [ ] 비디오에 대한 댓글 db 추가
- [ ] (심화) 비디오 찜기능

**[영상 플레이어]**

- [ ] iframe 안에 id에 해당하는 유튜브 영상 삽입

**[영상 댓글]**

- [ ] 영상에 대한 댓글의 생성기능. 유저id, 내용, 타임스탬프 기록. 최신순 정렬.
- [ ] 영상에 대한 댓글은 모두 읽기 가능
- [ ] 로그인한 유저가 댓글 작성자라면 수정 및 삭제 가능. 수정 및 삭제 버튼 노출.
- [ ] (심화) 유저정보에 내가 쓴 댓글 추가

## 회원 관련 페이지

**[회원가입]**

- [ ] 아이디, 이름, 이메일, 비밀번호 입력받기
- [ ] 비밀번호 확인 기능
- [ ] 비밀번호는 최소 4자 ~ 최대 10자
- [ ] 유저 db에 등록하면서 id 자동 부여.

**[로그인]**

- [ ] 유저 db에 해당하는 아이디와 비밀번호가 있는지 확인
- [ ] 로그인에 성공하면 해당 id를 로그인 id로 저장.

**[(심화)회원정보]**

- [ ] 회원정보수정
- [ ] 찜영상
- [ ] 내가 쓴 리뷰
- [ ] 팔로우
