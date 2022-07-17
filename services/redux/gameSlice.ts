import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface GameState {
  score: number;
  selectedAnswer?: string;
  currentQuestion: number;
  inGame: boolean;
}

const initialState: GameState = {
  score: 0,
  selectedAnswer: null,
  currentQuestion: 0,
  inGame: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    incrementScore: (state) => {
      state.score += 1;
    },
    setAnswer: (state, action: PayloadAction<string>) => {
      state.selectedAnswer = action.payload;
    },
    resetAnswer: (state) => {
      state.selectedAnswer = null;
    },
    advanceQuestion: (state) => {
      state.currentQuestion += 1;
    },
    resetGame: (state) => {
      state.selectedAnswer = null;
      state.score = 0;
      state.currentQuestion = 0;
    },
    startGame: (state) => {
      state.inGame = true;
    },
    endGame: (state) => {
      state.inGame = false;
      state.selectedAnswer = null;
      state.score = 0;
      state.currentQuestion = 0;
    },
  },
});

export const {
  incrementScore,
  setAnswer,
  resetAnswer,
  advanceQuestion,
  resetGame,
  startGame,
  endGame,
} = gameSlice.actions;

export default gameSlice.reducer;
