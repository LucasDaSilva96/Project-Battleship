const play_button = document.getElementById("play-btn");
const place_ships_section = document.querySelector(".place-ships-container");
const play_button_box = document.querySelector(".play-btn-box");

// This is for rendering the place ships section
export function renderPlaceShipsSection() {
  play_button.addEventListener("click", play_event);
}

// This is for hiding the play button box and show the place ships section
function play_event() {
  place_ships_section.classList.toggle("hidden");
  play_button_box.classList.toggle("hidden");
}
