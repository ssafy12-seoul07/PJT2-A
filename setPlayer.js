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
    height: "315",
  });
  section.appendChild(player);
  return section;
};

const setReviewSection = (data, id) => {
  const section = element("section", { class: "review-section" });
  const ul = element("ul", { class: "review-list" });
  data.forEach((object) => {
    if (object.id === id) {
      object.reviews.forEach((review) => {
        const li = element("li", { class: "review" }, review);
        ul.appendChild(li);
      });
    }
  });
  section.appendChild(ul);
  return section;
};

const setPlayer = () => {
  // const response = await fetch("./playlist.json");
  // const data = await response.json();

  const section = element("section", { class: "player-wrapper" });
  section.append(setVideoSection(data.id), setReviewSection(data, id));
  document.getElementById("player").appendChild(section);
};

document.addEventListener("DOMContentLoaded", setPlayer);
