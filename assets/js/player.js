import { videoData } from "./script.js";

// 엘리먼트 생성과 속성 할당을 위한 메서드
const element = (tag, attributes = {}, textContent = "") => {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([k, v]) => element.setAttribute(k, v));
  if (textContent) element.textContent = textContent;
  return element;
};

const getVideoInfo = async (videoId) => {
  const videoInfo = videoData.find((video) => video.id === videoId);
  if (videoInfo) {
    return videoInfo;
  }
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
  const videoInfo = element("div", { class: "player-video-info" });
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
  button.addEventListener("click", () => {
    const reviewContent = input.value.trim();
    if (reviewContent !== "") {
      addNewReview(data.id, reviewContent);
      input.value = "";
      button.disabled = true;
    }
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

const addNewReview = (videoId, value) => {
  const reviewContent = value.trim();
  if (reviewContent !== "") {
    const reviewTime = new Date();
    const reviewTimeFormat = reviewTime.toLocaleString();
    const newReview = {
      userName: localStorage.getItem("loginUser")
        ? `${localStorage.getItem("loginUser.name")} `
        : "비회원",
      commentTime: reviewTimeFormat,
      review: reviewContent,
    };
    let videoData = JSON.parse(localStorage.getItem("Data"));
    const videoIndex = videoData.findIndex((video) => video.id === videoId);

    if (videoIndex !== -1) {
      videoData[videoIndex].reviews.push(newReview);
      localStorage.setItem("Data", JSON.stringify(videoData));
    }
  }
};

const setPlayer = async (videoInfo) => {
  const section = element("section", { class: "player-wrapper" });
  section.append(
    setVideoSection(videoInfo.id),
    setInfoSection(videoInfo),
    setReviewSection(videoInfo)
  );
  document.getElementById("player").appendChild(section);

  window.addEventListener("storage", (e) => {
    if (e.key === "Data") {
      updatePlayerInfo(videoId);
    }
  });
};

const updatePlayerInfo = async (videoId) => {
  const updatedVideoInfo = await getVideoInfo(videoId);
  if (!updatedVideoInfo) {
    return;
  }

  const reviewSection = document.querySelector(".review-section");
  if (reviewSection) {
    const newReviewSection = setReviewSection(updatedVideoInfo);
    reviewSection.replaceWith(newReviewSection);
  }
};

// sets video player
const url = new URL(window.location.href);
const videoId = url.searchParams.get("id");

if (videoId) {
  const videoInfo = await getVideoInfo(videoId);
  setPlayer(videoInfo);
} else {
  console.error("No video ID provided");
}
