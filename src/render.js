const play_button = document.getElementById("play-btn");
const place_ships_section = document.querySelector(".place-ships-container");
const play_button_box = document.querySelector(".play-btn-box");
const title = document.getElementById("title");

// This is for rendering the place ships section
export function renderPlaceShipsSection() {
  play_button.addEventListener("click", play_event);
}

// This is for hiding the play button box and show the place ships section
function play_event() {
  place_ships_section.classList.toggle("hidden");
  play_button_box.classList.toggle("hidden");
  title.classList.toggle("hidden");
}

const ships_draggable = document.querySelectorAll(".ship");

export let angle = 0;
export function flip() {
  angle = angle === 0 ? 90 : 0;

  ships_draggable.forEach(
    (ship) => (ship.style.transform = `rotate(${angle}deg)`)
  );
}

export function renderPlaySection() {
  const ships_container = document.querySelector(".ships-container");
  const ai_board_container = document.querySelector(
    ".place-ships-Ai-game-board"
  );
  ships_container.classList.add("hidden");
  ai_board_container.classList.remove("hidden");
}
