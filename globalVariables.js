export const gameState = {
  currentTeam: "team1", // team1 of team2
  teams: {
    team1: {
      teamName: "Team 1",
      greenballs: 0,
      redballs: 0,
      correctGuesses: 0,
      losestreak: 0,
      currentRowIndex: 0,
    },
    team2: {
      teamName: "Team 2",
      greenballs: 0,
      redballs: 0,
      correctGuesses: 0,
      losestreak: 0,
      currentRowIndex: 0,
    },
  },
  balls: {
    team1: [],
    team2: [],
  },
};

export function switchTeam() {
  gameState.currentTeam = gameState.currentTeam === "team1" ? "team2" : "team1";
}

export function displayCurrentTeam() {
  document.getElementById("active-team-display").textContent = `Actieve team: ${
    gameState.currentTeam === "team1"
      ? gameState.teams.team1.teamName
      : gameState.teams.team2.teamName
  }`;
}
