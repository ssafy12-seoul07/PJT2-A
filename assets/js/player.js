// 엘리먼트 생성과 속성 할당을 위한 메서드
const element = (tag, attributes = {}, textContent = "") => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([k, v]) => element.setAttribute(k, v));
  if (textContent) element.textContent = textContent;
  return element;
};

// video iframe을 fragment에 추가하기 위한 메서드
// form으로 받아온 id 스트링으로 비디오를 재생
const setVideoSection = (id) => {
  const section = element("section", { class: "player-section" });
  const videoString = `https://www.youtube.com/embed/${id}`;
  const player = element("iframe", {
    src: videoString,
    frameborder: "0",
    allowfullscreen: true,
    width: "100%",
    height: "500",
  });

  section.append(player);
  return section;
};
const setInfoSection = (data) => {
  const section = element("section", { class: "info-section" });
  const videoInfo = element("div", { class: "video-info" });
  const infoDiv = element("div", { class: "infoDiv" });
  const title = element("h2", { class: "video-title" }, data.title);
  const uploader = element(
    "span",
    { class: "video-uploader" },
    data.channelName
  );
  infoDiv.append(title, uploader);
  const like = element("button", {
    href: "",
    class: "like",
  });
  const likeIcon = element("i", { class: "fa-regular fa-heart" });
  like.appendChild(likeIcon);

  videoInfo.append(infoDiv, like);
  section.append(videoInfo);
  return section;
};
const setReviewSection = (data) => {
  const reviewSection = element("section", { class: "review-section" });
  const inputSection = element("div", { class: "review-input-section" });
  const userImage = element("img", { src: "", class: "user-image" });
  const input = element("input", {
    class: "review-input",
    type: "text",
    placeholder: "리뷰를 남겨보세요!",
    value: "",
  });
  const button = element("button", {
    class: "review-submit-button",
    type: "button",
    disabled: true,
  });
  input.addEventListener("input", function () {
    button.disabled = input.value.trim() === "";
  });
  button.appendChild(element("i", { class: "fa-solid fa-arrow-right" }));
  inputSection.append(userImage, input);

  const commentSection = element("div", { class: "review-comment-section" });
  const ul = element("ul", { class: "review-list" });
  // db에서 리뷰 정보를 동적으로 받아올 부분
  data.reviews.forEach((object) => {
    const li = element("li", { class: "review" });
    const userInfo = element("div", { class: "user-info" });

    const userImage = element("img", { src: "", class: "user-image" });
    const userName = element(
      "span",
      { class: "review-user-name" },
      object.userName
    );
    const commentTime = element(
      "span",
      { class: "comment-time" },
      `· ${object.commentTime}`
    );
    const review = element("span", { class: "review-content" }, object.review);

    userInfo.append(userImage, userName, commentTime);
    li.append(userInfo, review);
    ul.appendChild(li);
  });
  commentSection.append(inputSection, ul);
  reviewSection.append(commentSection, button);
  return reviewSection;
};

const setPlayer = async (id) => {
  const response = await fetch("../../data/video.json");
  const data = await response.json();
  const videoInfo = data.find((object) => object.id === id);

  const section = element("section", { class: "player-wrapper" });
  section.append(
    setVideoSection(videoInfo.id),
    setInfoSection(videoInfo),
    setReviewSection(videoInfo)
  );
  document.getElementById("player").appendChild(section);
};

export { setPlayer };

// sets video player
const url = new URL(window.location.href);
const videoId = url.searchParams.get("id");

if (videoId) {
  setPlayer(videoId);
} else {
  console.error("No video ID provided");
}
// 스타일 테스트를 위한 부분.
// 사용 시에는 import { setPlayer } from "상대경로" 로 임포트 후 setPlayer(id) 로 사용
// setPlayer("gMaB-fG4u4g");
