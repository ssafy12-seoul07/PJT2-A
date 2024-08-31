let currentSlideMostViewed = 0;
let currentSlidePartCategory = 0;
let videoData = [];

// video.json 파일을 가져와 데이터를 불러옴
fetch('./data/video.json')
  .then(response => response.json())
  .then(data => {
    videoData = data;
    console.log('Video data loaded:', videoData);  // 불러온 데이터 확인
    loadMostViewedVideos();
    filterVideosByPart('전신');  // 기본값 '전신'으로 설정
    setInterval(loadMostViewedVideos, 3000);
  })
  .catch(error => console.error('Error loading video data:', error));

// 로컬 스토리지에서 조회수를 관리하기 위한 함수
function getViews(videoId) {
  return parseInt(localStorage.getItem(videoId)) || 0;
}

function incrementViews(videoId) {
  let views = getViews(videoId);
  views += 1;
  localStorage.setItem(videoId, views);
}

// 조회수에 따라 영상을 정렬하는 함수
function sortVideosByViews(videos) {
  return videos.sort((a, b) => getViews(b.id) - getViews(a.id));
}

// "최근 많이 본 영상" 섹션 채우기
function loadMostViewedVideos() {
  const slider = document.getElementById("videos-most-viewed");
  const sortedVideos = sortVideosByViews(videoData);

  slider.innerHTML = ""; // 슬라이더 초기화

  for (let i = currentSlideMostViewed * 3; i < (currentSlideMostViewed + 1) * 3 && i < sortedVideos.length; i++) {
    const video = sortedVideos[i];
    slider.innerHTML += `
      <div class="video-item">
        <a href="${video.url}" target="_blank" onclick="incrementViews('${video.id}')">
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

// 드롭다운 메뉴에서 선택된 파트에 따라 텍스트와 비디오 업데이트
function filterVideosByPart(part) {
  const dropdownButton = document.getElementById('partDropdown');
  dropdownButton.textContent = part;  // 드롭다운 버튼 텍스트 업데이트

  const categoryDiv = document.getElementById('video-category');
  const filteredVideos = videoData.filter(video => video.part === part);

  categoryDiv.innerHTML = ''; // 비디오 카테고리 초기화
  displayPartVideos(filteredVideos); // 필터링된 비디오를 표시
}

// 필터링된 비디오 표시 함수
function displayPartVideos(videos) {
  const categoryDiv = document.getElementById('video-category');
  categoryDiv.innerHTML = '';

  for (let i = currentSlidePartCategory * 3; i < (currentSlidePartCategory + 1) * 3; i++) {
    const index = i % videos.length; // 영상이 부족하면 처음부터 반복
    const video = videos[index];
    categoryDiv.innerHTML += `
      <div class="video-item">
        <a href="${video.url}" target="_blank" onclick="incrementViews('${video.id}')">
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

// 운동 부위별 영상 슬라이더
function slidePartCategory(direction) {
  const filteredVideos = videoData.filter(video => video.part === document.getElementById('partDropdown').textContent.trim());
  const totalVideos = filteredVideos.length;
  const maxSlides = Math.ceil(totalVideos / 3);

  currentSlidePartCategory += direction;

  if (currentSlidePartCategory < 0) currentSlidePartCategory = maxSlides - 1;
  if (currentSlidePartCategory >= maxSlides) currentSlidePartCategory = 0;

  displayPartVideos(filteredVideos); // 현재 슬라이드에 해당하는 비디오 표시
}

// 조회수 높은 영상 슬라이더
function slideMostViewed(direction) {
  const sortedVideos = sortVideosByViews(videoData);
  const totalVideos = sortedVideos.length;
  const maxSlides = Math.ceil(totalVideos / 3);

  currentSlideMostViewed += direction;

  if (currentSlideMostViewed < 0) currentSlideMostViewed = maxSlides - 1;
  if (currentSlideMostViewed >= maxSlides) currentSlideMostViewed = 0;

  loadMostViewedVideos();
}
