// register.js

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const userId = document.getElementById("id");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const submitButton = document.querySelector('button[type="submit"]');

  // 1. 비밀번호 확인 함수
  function validatePassword() {
    if (password.value === confirmPassword.value) {
      confirmPassword.setCustomValidity("");
      confirmPassword.classList.remove("is-invalid");
      confirmPassword.classList.add("is-valid");
    } else {
      confirmPassword.setCustomValidity("비밀번호가 일치하지 않습니다.");
      confirmPassword.classList.remove("is-valid");
      confirmPassword.classList.add("is-invalid");
    }
    confirmPassword.nextElementSibling.textContent =
      confirmPassword.validationMessage;
  }

  // 비밀번호 입력 필드에 이벤트 리스너 추가
  password.addEventListener("input", validatePassword);
  confirmPassword.addEventListener("input", validatePassword);

  // 2. 폼 유효성 검사 및 버튼 활성화 함수
  function validateForm() {
    if (form.checkValidity() && password.value === confirmPassword.value) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  // 모든 입력 필드에 대해 이벤트 리스너 추가
  Array.from(form.elements).forEach((element) => {
    element.addEventListener("input", validateForm);
  });

  // 초기 폼 상태 확인
  validateForm();

  // 5. ID 중복 체크 함수
  function isUserIdUnique(id) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return !users.some((user) => user.id === id);
  }

  // 3 & 4 & 5. 폼 제출 처리
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (form.checkValidity() && password.value === confirmPassword.value) {
      if (!isUserIdUnique(id.value)) {
        alert("이미 존재하는 아이디입니다. 다른 아이디를 선택해주세요.");
        return;
      }

      const newUser = {
        userId: Date.now().toString(), // 고유 ID 생성
        id: id.value,
        pw: password.value,
        name: name.value,
        email: email.value,
        myReview: [], // 내가 쓴 리뷰
        myZzim: [], // 내가 찜한 영상
        following: [], // 팔로잉
        follower: [], // 팔로워
      };

      // 로컬 스토리지에 사용자 정보 저장
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      alert("회원가입이 완료되었습니다!");
      window.location.href = "/login.html"; // 로그인 페이지로 리다이렉트
    }
  });
});
