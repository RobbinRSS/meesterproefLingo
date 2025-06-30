import { words } from "./words.js";
import { setupBingoCard, markBingoNumber, hasBingoLine } from "./bingocard.js";
import { createRows } from "./setupLingoBord.js";
import {
  displayBalls,
  drawBalls,
  handleDraw,
  resetBalls,
} from "./ballFunctions.js";
import {
  gameState,
  displayCurrentTeam,
  switchTeam,
} from "./globalVariables.js";
import { displayMessage } from "./displayMessage.js";

// basis variabelen //
const startBtn = document.getElementById("start-btn");
const checkBtn = document.getElementById("check-btn");
let currentRowIndex = 0;
let randomWord = "";
//

// start knop //
startBtn.addEventListener("click", function () {
  randomWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
  currentRowIndex = 0;
  for (let i = 1; i <= 2; i++) {
    gameState.teams[`team${i}`].greenballs = 0;
    gameState.teams[`team${i}`].redballs = 0;
    gameState.teams[`team${i}`].losestreak = 0;
    gameState.teams[`team${i}`].correctGuesses = 0;
  }

  gameState.teams.team1.teamName = prompt("Naam voor team 1");
  gameState.teams.team2.teamName = prompt("Naam voor team 2");

  resetBalls();

  gameState.currentTeam = "team1";
  document.getElementById("draw-ball-info").innerHTML = "";

  displayCurrentTeam();
  displayBalls();
  createRows(randomWord);
  console.log(randomWord);
  setupBingoCard();
});
//

// maakt een nieuw woord aan als het potje nog niet voorbij is //
function newWord() {
  randomWord = words[Math.floor(Math.random() * words.length)].toLowerCase();
  currentRowIndex = 0;

  createRows(randomWord);

  console.log("Nieuw woord:", randomWord);

  const firstInput = document.querySelector(".row input");
  if (firstInput) firstInput.focus();
}
//

// check als word is correct //
checkBtn.addEventListener("click", checkLetters);

function checkLetters() {
  const team = gameState.currentTeam;
  const rows = document.querySelectorAll(".row");

  if (currentRowIndex >= rows.length) {
    gameState.teams[team].losestreak++;
    displayMessage(
      `Geen pogingen meer, het woord was ${randomWord}`,
      "red",
      5000
    );
    if (!checkWinOrLose()) {
      newWord();
    }
    switchTeam();
    displayCurrentTeam();
    return;
  }

  const row = rows[currentRowIndex];
  const inputs = row.querySelectorAll("input");
  const guess = Array.from(inputs).map((input) => input.value.toLowerCase());

  if (guess.some((letter) => letter === "")) {
    displayMessage("Vul alle letters in.", "red", 3000);
    return;
  }

  // Stap 1: Maak arrays voor status en lettertelling
  const result = Array(guess.length).fill("gray");
  const letterCount = {};

  // Tel letters in randomWord
  for (let i = 0; i < randomWord.length; i++) {
    const letter = randomWord[i];
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  }

  // Stap 2: Eerst correcte letters op de juiste plek markeren (groen)
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === randomWord[i]) {
      result[i] = "green";
      letterCount[guess[i]]--; // Verlaag beschikbare telling
    }
  }

  // Stap 3: Dan de overige juiste letters op verkeerde plek markeren (oranje)
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === "gray" && letterCount[guess[i]] > 0) {
      result[i] = "orange";
      letterCount[guess[i]]--;
    }
  }

  // Stap 4: Pas de borders aan op basis van resultaat
  for (let i = 0; i < guess.length; i++) {
    const input = inputs[i];
    if (result[i] === "green") {
      input.style.border = "2px solid greenyellow";
    } else if (result[i] === "orange") {
      input.style.border = "2px solid orange";
    } else {
      input.style.border = "2px solid gray";
    }
    input.disabled = true;
  }

  // Controleer of het woord goed is geraden
  if (guess.join("") === randomWord) {
    displayMessage("🎉 Je hebt het woord geraden!", "green", 5000);
    gameState.teams[team].losestreak = 0;
    gameState.teams[team].correctGuesses++;
    drawBalls();
    if (!checkWinOrLose()) {
      newWord();
    }
  } else {
    currentRowIndex++;
    const nextRow = rows[currentRowIndex];
    if (nextRow) {
      const firstInput = nextRow.querySelector("input");
      if (firstInput) firstInput.focus();
    }
  }
}
//

// kijkt of de gebruiker heeft gewonnen of verloren //
function checkWinOrLose() {
  // krijg de team naam
  const team = gameState.currentTeam;
  const teamName = team === "team1" ? "Team 1" : "Team 2";
  const balls = gameState.teams[team];

  // win condities
  if (balls.greenballs >= 3) {
    displayMessage(`🎉 ${teamName} wint met 3 groene ballen!`, "green", 5000);
    return true;
  } else if (balls.redballs >= 3) {
    displayMessage(`💥 ${teamName} verliest met 3 rode ballen!`, "red", 5000);
    return true;
  } else if (gameState.teams[team].correctGuesses >= 10) {
    displayMessage(
      `🎯 ${teamName} wint met 10 correcte woorden!`,
      "green",
      5000
    );
    return true;
  } else if (gameState.teams[team].losestreak >= 3) {
    displayMessage(`💣 ${teamName} verliest na 3 foute beurten!`, "red", 5000);
    return true;
  } else if (hasBingoLine(team)) {
    displayMessage(`🏆 ${teamName} wint met een bingo-lijn!`, "green", 5000);
    return true;
  }

  return false;
}

export { checkWinOrLose };
//
