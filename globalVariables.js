export const gameState = {
  currentTeam: "team1", // team1 of team2
  teams: {
    team1: {
      greenballs: 0,
      redballs: 0,
      correctGuesses: 0,
      losestreak: 0,
      currentRowIndex: 0,
    },
    team2: {
      greenballs: 0,
      redballs: 0,
      correctGuesses: 0,
      losestreak: 0,
      currentRowIndex: 0,
    },
  },
};

export function switchTeam() {
  gameState.currentTeam = gameState.currentTeam === "team1" ? "team2" : "team1";
}

export function displayCurrentTeam() {
  document.getElementById(
    "active-team-display"
  ).textContent = `Actieve team: ${gameState.currentTeam}`;
}
