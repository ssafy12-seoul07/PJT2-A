// login.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const idInput = document.getElementById("id");
  const passwordInput = document.getElementById("password");
  const loginButton = document.querySelector('button[type="submit"]');

  // 1. 입력 필드 유효성 검사 및 버튼 활성화 함수
  function validateForm() {
    if (
      idInput.value.trim() !== "" &&
      passwordInput.value.trim().length >= 4 &&
      passwordInput.value.trim().length <= 10
    ) {
      loginButton.disabled = false;
    } else {
      loginButton.disabled = true;
    }
  }

  // 입력 필드에 이벤트 리스너 추가
  idInput.addEventListener("input", validateForm);
  passwordInput.addEventListener("input", validateForm);

  // 2 & 3 & 4. 로그인 처리 함수
  function handleLogin(event) {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.id === idInput.value && u.pw === passwordInput.value
    );

    if (user) {
      // 로그인 성공
      const { pw, ...loginUser } = user; // pw를 제외한 나머지 정보
      localStorage.setItem("loginUser", JSON.stringify(loginUser));
      alert("로그인에 성공했습니다!");
      window.location.href = "/"; // 메인 페이지로 리다이렉트
    } else {
      // 로그인 실패
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      passwordInput.value = ""; // 비밀번호 입력 초기화
      loginButton.disabled = true; // 버튼 비활성화
    }
  }

  // 폼 제출 이벤트 리스너 추가
  form.addEventListener("submit", handleLogin);

  // 초기 폼 상태 확인
  validateForm();
});
