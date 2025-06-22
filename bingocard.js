const bingoCardTeam1Element = document.getElementById("bingo-card-team1");
const bingoCardTeam2Element = document.getElementById("bingo-card-team2");
import { gameState } from "./globalVariables.js";

const evenNumbers = [
  2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32,
];
const oddNumbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31];

let bingoCardTeam1 = [];
let bingoCardTeam2 = [];

export function setupBingoCard() {
  bingoCardTeam1 = shuffleAndSlice(evenNumbers);
  bingoCardTeam2 = shuffleAndSlice(oddNumbers);

  document.getElementById("bingo-team1").textContent =
    gameState.teams.team1.teamName;
  document.getElementById("bingo-team2").textContent =
    gameState.teams.team2.teamName;

  renderCard(bingoCardTeam1, bingoCardTeam1Element, "team1");
  renderCard(bingoCardTeam2, bingoCardTeam2Element, "team2");
}

function shuffleAndSlice(numbers) {
  return numbers.sort(() => 0.5 - Math.random()).slice(0, 16);
}

function renderCard(card, element, team) {
  let html = "";
  for (let i = 0; i < 4; i++) {
    html += "<tr>";
    for (let j = 0; j < 4; j++) {
      const num = card[i * 4 + j];
      html += `<td id="bingo-${team}-${num}">${num}</td>`;
    }
    html += "</tr>";
  }
  element.innerHTML = html;
}

// Nummer markeren voor beide teams
export function markBingoNumber(num) {
  ["team1", "team2"].forEach((team) => {
    const cell = document.getElementById(`bingo-${team}-${num}`);
    if (cell) {
      cell.style.backgroundColor = "limegreen";
      cell.style.color = "white";
    }
  });
}

// Bingo check voor beide teams
export function hasBingoLine(team) {
  const numbers = team === "team1" ? evenNumbers : oddNumbers;
  const card = team === "team1" ? bingoCardTeam1 : bingoCardTeam2;

  const marked = numbers.filter((num) => {
    const cell = document.getElementById(`bingo-${team}-${num}`);
    return cell && cell.style.backgroundColor === "limegreen";
  });

  const matrix = [];
  for (let i = 0; i < 4; i++) {
    matrix[i] = card.slice(i * 4, i * 4 + 4);
  }

  // Horizontaal
  for (let row of matrix) {
    if (row.every((num) => marked.includes(num))) return true;
  }

  // Verticaal
  for (let col = 0; col < 4; col++) {
    if (matrix.every((row) => marked.includes(row[col]))) return true;
  }

  // Diagonaal
  if (matrix.every((row, i) => marked.includes(row[i]))) return true;
  if (matrix.every((row, i) => marked.includes(row[3 - i]))) return true;

  return false;
}
