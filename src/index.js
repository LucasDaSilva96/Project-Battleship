import "./style.css";
import { renderPlaceShipsSection } from "./render.js";
import { flip } from "./render.js";
renderPlaceShipsSection();

const flip_btn = document.getElementById("flip");

flip_btn.addEventListener("click", flip);
