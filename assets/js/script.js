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
