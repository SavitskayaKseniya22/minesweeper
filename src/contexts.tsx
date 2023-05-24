import React from 'react';

export const InitContext = React.createContext({ difficulty: 'easy', bombNumber: '10' });
export const GameCycleContext = React.createContext<{
  isGameFinished: boolean;
  isGameStarted: boolean;
  setIsGameFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isGameStarted: false,
  isGameFinished: false,
  setIsGameFinished: () => {},
  setIsGameStarted: () => {},
});