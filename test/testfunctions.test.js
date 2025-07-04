// Zorg dat deze DOM elementen bestaan voordat je script importeert
document.body.innerHTML = `
  <button id="start-btn"></button>
  <button id="check-btn"></button>
  <div id="draw-ball-info"></div>
`;

// Importeer je module en roep init aan om eventlisteners te binden
import * as scriptModule from "../script.js";
scriptModule.init();

// Importeer overige functies en mocks
import { resetBalls, drawBalls, handleDraw } from "../ballFunctions.js";
import { gameState } from "../globalVariables.js";
import { markBingoNumber } from "../bingocard.js";

// Mock externe modules die je gebruikt in je code
jest.mock("../bingocard.js", () => ({
  markBingoNumber: jest.fn(),
}));

jest.mock("../displayMessage.js", () => ({
  displayMessage: jest.fn(),
  drawballInfo: jest.fn(),
}));

jest.mock("../globalVariables.js", () => {
  const state = {
    teams: {
      team1: { greenballs: 0, redballs: 0, losestreak: 0, correctGuesses: 0 },
      team2: { greenballs: 0, redballs: 0, losestreak: 0, correctGuesses: 0 },
    },
    balls: {
      team1: [],
      team2: [],
    },
    currentTeam: "team1",
  };
  return {
    gameState: state,
    switchTeam: jest.fn(),
    displayCurrentTeam: jest.fn(),
  };
});

describe("Game Logic", () => {
  beforeEach(() => {
    // Reset game state voor elke test
    gameState.currentTeam = "team1";
    gameState.teams.team1.greenballs = 0;
    gameState.teams.team1.redballs = 0;
    gameState.teams.team1.losestreak = 0;
    gameState.teams.team1.correctGuesses = 0;
    gameState.teams.team2 = {
      greenballs: 0,
      redballs: 0,
      losestreak: 0,
      correctGuesses: 0,
    };
    gameState.balls.team1 = [];
    gameState.balls.team2 = [];
  });

  test("checkWinOrLose returns true if 3 green balls", () => {
    gameState.teams.team1.greenballs = 3;
    expect(scriptModule.checkWinOrLose()).toBe(true);
  });

  test("checkWinOrLose returns true if 3 red balls", () => {
    gameState.teams.team1.redballs = 3;
    expect(scriptModule.checkWinOrLose()).toBe(true);
  });

  test("resetBalls populates ball array correctly", () => {
    resetBalls();
    expect(gameState.balls.team1.length).toBeGreaterThan(6);
    expect(gameState.balls.team2.length).toBeGreaterThan(6);
    expect(gameState.balls.team1).toContain(2);
    expect(gameState.balls.team2).toContain(3);
  });

  test("handleDraw increments green ball count", () => {
    handleDraw("green");
    expect(gameState.teams.team1.greenballs).toBe(1);
  });

  test("handleDraw increments red ball count", () => {
    handleDraw("red");
    expect(gameState.teams.team1.redballs).toBe(1);
  });

  test("handleDraw calls markBingoNumber with correct number", () => {
    handleDraw(16);
    expect(markBingoNumber).toHaveBeenCalledWith(16);
  });
});
