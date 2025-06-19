import {
  gameState,
  switchTeam,
  displayCurrentTeam,
} from "./globalVariables.js";
import { markBingoNumber } from "./bingocard.js";
import { checkWinOrLose } from "./script.js";
import { drawballInfo } from "./displayMessage.js";

// display de ballen voor beide teams
export function displayBalls() {
  ["team1", "team2"].forEach((team) => {
    document.getElementById(
      `greenballs-${team}`
    ).textContent = `Green balls (${team}) = ${gameState.teams[team].greenballs}`;
    document.getElementById(
      `redballs-${team}`
    ).textContent = `Red balls (${team}) = ${gameState.teams[team].redballs}`;
  });
}

export function drawBalls() {
  const team = gameState.currentTeam;

  // Ballen per team definiëren
  const commonBalls = ["green", "green", "green", "red", "red", "red"];
  const evenBalls = [
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32,
  ];
  const oddBalls = [
    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35,
  ];

  const teamBalls =
    team === "team1"
      ? [...commonBalls, ...evenBalls]
      : [...commonBalls, ...oddBalls];

  const firstDraw = teamBalls[Math.floor(Math.random() * teamBalls.length)];
  handleDraw(firstDraw);
  console.log(firstDraw);

  if (firstDraw !== "red") {
    const secondDraw = teamBalls[Math.floor(Math.random() * teamBalls.length)];
    handleDraw(secondDraw);
    console.log(secondDraw);
    drawballInfo(team, firstDraw, secondDraw);
  }

  if (firstDraw === "red") drawballInfo(team, firstDraw);

  displayBalls();

  if (!checkWinOrLose()) {
    switchTeam();
    displayCurrentTeam();
  }
}

export function handleDraw(ball) {
  const team = gameState.currentTeam;

  if (ball === "green") {
    gameState.teams[team].greenballs++;
  } else if (ball === "red") {
    gameState.teams[team].redballs++;
  } else {
    // bingo voor beide teams
    markBingoNumber(ball); // zorg dat markBingoNumber beide kaarten markeert
  }
}
