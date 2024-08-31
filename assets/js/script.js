let currentSlideMostViewed = 0;
let currentSlidePartCategory = 0;
let videoData = [];

fetch('./data/video.json')
  .then(response => response.json())
  .then(data => {
    videoData = data;
    loadMostViewedVideos();
    filterVideosByPart('전신'); 
    setInterval(loadMostViewedVideos, 3000);
  })
  .catch(error => console.error('Error loading video data:', error));

//조회수
function getViews(videoId) {
  return parseInt(localStorage.getItem(videoId)) || 0;
}

function incrementViews(videoId) {
  let views = getViews(videoId);
  views += 1;
  localStorage.setItem(videoId, views);
}


function sortVideosByViews(videos) {
  return videos.sort((a, b) => getViews(b.id) - getViews(a.id));
}


function loadMostViewedVideos() {
  const slider = document.getElementById("videos-most-viewed");
  const sortedVideos = sortVideosByViews(videoData);

  slider.innerHTML = ""; // 슬라이더 초기화

  for (let i = currentSlideMostViewed * 3; i < (currentSlideMostViewed + 1) * 3 && i < sortedVideos.length; i++) {
    const video = sortedVideos[i];
    slider.innerHTML += `
      <div class="video-item">
        <a href="./player.html?id=${video.id}" onclick="incrementViews('${video.id}')">
          <img src="${video.thumbnail}" alt="${video.title}">
          <p>${video.title.length > 10 ? video.title.substring(0, 10) + "..." : video.title}</p>
          <div class="video-info">
            <span class="category">${video.part}</span>
            <span class="channel">${video.channelName}</span>
          </div>
        </a>
      </div>
    `;
  }

  currentSlideMostViewed++;
  if (currentSlideMostViewed * 3 >= sortedVideos.length) {
    currentSlideMostViewed = 0;
  }
}


function filterVideosByPart(part) {
  const dropdownButton = document.getElementById('partDropdown');
  dropdownButton.textContent = part; 

  const categoryDiv = document.getElementById('video-category');
  const filteredVideos = videoData.filter(video => video.part === part);

  categoryDiv.innerHTML = ''; 
  displayPartVideos(filteredVideos); 
}


function displayPartVideos(videos) {
  const categoryDiv = document.getElementById('video-category');
  categoryDiv.innerHTML = '';

  for (let i = currentSlidePartCategory * 3; i < (currentSlidePartCategory + 1) * 3; i++) {
    const index = i % videos.length; // 영상이 끝까지 도달하면 다시 첫 영상부터 시작
    const video = videos[index];
    categoryDiv.innerHTML += `
      <div class="video-item">
        <a href="./player.html?id=${video.id}" onclick="incrementViews('${video.id}')">
          <img src="${video.thumbnail}" alt="${video.title}">
          <p>${video.title.length > 10 ? video.title.substring(0, 10) + "..." : video.title}</p>
          <div class="video-info">
            <span class="category">${video.part}</span>
            <span class="channel">${video.channelName}</span>
          </div>
        </a>
      </div>
    `;
  }
}


function slidePartCategory(direction) {
  const filteredVideos = videoData.filter(video => video.part === document.getElementById('partDropdown').textContent.trim());
  const totalVideos = filteredVideos.length;
  const maxSlides = Math.ceil(totalVideos / 3);

  currentSlidePartCategory += direction;

  if (currentSlidePartCategory < 0) currentSlidePartCategory = maxSlides - 1;
  if (currentSlidePartCategory >= maxSlides) currentSlidePartCategory = 0;

  displayPartVideos(filteredVideos); 
}


function slideMostViewed(direction) {
  const sortedVideos = sortVideosByViews(videoData);
  const totalVideos = sortedVideos.length;
  const maxSlides = Math.ceil(totalVideos / 3);

  currentSlideMostViewed += direction;

  if (currentSlideMostViewed < 0) currentSlideMostViewed = maxSlides - 1;
  if (currentSlideMostViewed >= maxSlides) currentSlideMostViewed = 0;

  loadMostViewedVideos();
}

// document.addEventListener("DOMContentLoaded", function () {
//   // DOM 요소 선택
//   const registerItem = document.getElementById("registerItem");
//   const loginItem = document.getElementById("loginItem");
//   const logoutItem = document.getElementById("logoutItem");
//   const logoutButton = document.querySelector("#logoutItem > a");

//   /**
//    * 로그인 상태에 따라 메뉴 항목의 표시 여부를 업데이트하는 함수
//    * 로그인 상태: 회원가입, 로그인 메뉴 숨김, 로그아웃 메뉴 표시
//    * 로그아웃 상태: 회원가입, 로그인 메뉴 표시, 로그아웃 메뉴 숨김
//    */
//   function updateAuthItems() {
//     const loginUser = localStorage.getItem("loginUser");
//     if (loginUser) {
//       // 로그인 상태
//       registerItem.style.display = "none";
//       loginItem.style.display = "none";
//       logoutItem.style.display = "block";
//     } else {
//       // 로그아웃 상태
//       registerItem.style.display = "block";
//       loginItem.style.display = "block";
//       logoutItem.style.display = "none";
//     }
//   }

//   /**
//    * 로그아웃 처리 함수
//    * 1. 로컬 스토리지에서 loginUser 데이터 삭제
//    * 2. 메뉴 항목 업데이트
//    * 3. 로그아웃 알림 표시
//    * 4. 홈페이지로 리다이렉트
//    * @param {Event} event - 클릭 이벤트 객체
//    */
//   function logout(event) {
//     event.preventDefault(); // 기본 이벤트 동작 방지
//     localStorage.removeItem("loginUser"); // 로그인 데이터 삭제
//     updateAuthItems(); // 메뉴 항목 업데이트
//     alert("로그아웃되었습니다.");
//     // window.location.href = "/"; // 홈페이지로 리다이렉트
//   }

//   // 로그아웃 버튼에 이벤트 리스너 추가
//   if (logoutButton) {
//     logoutButton.addEventListener("click", logout);
//   }

//   // 페이지 로드 시 초기 상태 설정
//   updateAuthItems();
// });