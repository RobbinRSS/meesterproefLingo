import { gameState } from "./globalVariables.js";

export function displayMessage(msg = "", color = "black", time = 0) {
  const msgField = document.getElementById("message");

  msgField.textContent = msg;
  msgField.style.color = color;

  setTimeout(() => {
    msgField.textContent = "";
  }, time);
}

export function drawballInfo(team, ball1, ball2 = "geen") {
  document.getElementById("draw-ball-info").innerHTML += `<p>${
    team === "team1"
      ? gameState.teams.team1.teamName
      : gameState.teams.team2.teamName
  } pakt de ballen ${ball1} en ${ball2}</p>`;
}
