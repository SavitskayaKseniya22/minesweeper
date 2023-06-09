import React from 'react';

const GameCycleContext = React.createContext<{
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

export default GameCycleContext;
