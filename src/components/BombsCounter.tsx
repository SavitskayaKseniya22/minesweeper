import React, { ReactNode, createContext, useContext, useMemo, useState } from 'react';

type Context = {
  bombsValue: number;
  increseBombsValue: () => void;
  decreseBombsValue: () => void;
  resetBombsValue: () => void;
};

const BombsCounterContext = createContext<Context>({} as Context);

export function BombsCounterDataProvider({
  children,
  maxValue,
}: {
  children: ReactNode;
  maxValue: number;
}) {
  const [bombsValue, setBombsValue] = useState(maxValue);

  const value = useMemo(() => {
    const increseBombsValue = () => {
      setBombsValue(bombsValue + 1);
    };

    const decreseBombsValue = () => {
      setBombsValue(bombsValue - 1);
    };

    const resetBombsValue = () => {
      setBombsValue(maxValue);
    };

    return {
      bombsValue,
      increseBombsValue,
      decreseBombsValue,
      resetBombsValue,
    };
  }, [maxValue, bombsValue]);

  return <BombsCounterContext.Provider value={value}>{children}</BombsCounterContext.Provider>;
}

export const useBombsState = () => useContext(BombsCounterContext);

function BombsCounter() {
  const { bombsValue } = useBombsState();
  return <div>Bombs left: {bombsValue}</div>;
}

const BombsCounterMemo = React.memo(BombsCounter);

export default BombsCounterMemo;
