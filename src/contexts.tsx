import React from 'react';

export const InitContext = React.createContext({
  actionData: { difficulty: 'easy', bombNumber: '10' },
});

export const GameCycleContext = React.createContext<{
  isGameFinished: 'win' | 'lose' | false;
  isGameStarted: boolean;
  setIsGameFinished: React.Dispatch<React.SetStateAction<'win' | 'lose' | false>>;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isGameStarted: false,
  isGameFinished: false,
  setIsGameFinished: () => {},
  setIsGameStarted: () => {},
});
