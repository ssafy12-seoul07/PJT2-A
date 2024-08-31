document.addEventListener("DOMContentLoaded", function () {
  // DOM 요소 선택
  const registerItem = document.getElementById("registerItem");
  const loginItem = document.getElementById("loginItem");
  const logoutItem = document.getElementById("logoutItem");
  const logoutButton = document.querySelector("#logoutItem > a");

  /**
   * 로그인 상태에 따라 메뉴 항목의 표시 여부를 업데이트하는 함수
   * 로그인 상태: 회원가입, 로그인 메뉴 숨김, 로그아웃 메뉴 표시
   * 로그아웃 상태: 회원가입, 로그인 메뉴 표시, 로그아웃 메뉴 숨김
   */
  function updateAuthItems() {
    const loginUser = localStorage.getItem("loginUser");
    if (loginUser) {
      // 로그인 상태
      registerItem.style.display = "none";
      loginItem.style.display = "none";
      logoutItem.style.display = "block";
    } else {
      // 로그아웃 상태
      registerItem.style.display = "block";
      loginItem.style.display = "block";
      logoutItem.style.display = "none";
    }
  }

  /**
   * 로그아웃 처리 함수
   * 1. 로컬 스토리지에서 loginUser 데이터 삭제
   * 2. 메뉴 항목 업데이트
   * 3. 로그아웃 알림 표시
   * 4. 홈페이지로 리다이렉트
   * @param {Event} event - 클릭 이벤트 객체
   */
  function logout(event) {
    event.preventDefault(); // 기본 이벤트 동작 방지
    localStorage.removeItem("loginUser"); // 로그인 데이터 삭제
    updateAuthItems(); // 메뉴 항목 업데이트
    alert("로그아웃되었습니다.");
    // window.location.href = "/"; // 홈페이지로 리다이렉트
  }

  // 로그아웃 버튼에 이벤트 리스너 추가
  if (logoutButton) {
    logoutButton.addEventListener("click", logout);
  }

  // 페이지 로드 시 초기 상태 설정
  updateAuthItems();
});
