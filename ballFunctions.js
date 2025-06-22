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

export function resetBalls() {
  const commonBalls = ["green", "green", "green", "red", "red", "red"];
  const evenBalls = [
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32,
  ];
  const oddBalls = [
    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35,
  ];

  gameState.balls.team1 = [...commonBalls, ...evenBalls];
  gameState.balls.team2 = [...commonBalls, ...oddBalls];
}

export function drawBalls() {
  const team = gameState.currentTeam;
  const teamBalls = gameState.balls[team];

  if (teamBalls.length === 0) {
    displayMessage("Er zijn geen ballen meer over voor dit team.", "red", 3000);
    return;
  }

  const firstIndex = Math.floor(Math.random() * teamBalls.length);
  const firstDraw = teamBalls.splice(firstIndex, 1)[0]; // verwijder de eerste bal

  handleDraw(firstDraw);
  console.log(firstDraw);

  if (firstDraw !== "red") {
    if (teamBalls.length > 0) {
      const secondIndex = Math.floor(Math.random() * teamBalls.length);
      const secondDraw = teamBalls.splice(secondIndex, 1)[0]; // verwijder tweede bal
      handleDraw(secondDraw);
      console.log(secondDraw);
      drawballInfo(team, firstDraw, secondDraw);
    } else {
      drawballInfo(team, firstDraw); // tweede bal niet meer beschikbaar
    }
  } else {
    drawballInfo(team, firstDraw);
  }

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
