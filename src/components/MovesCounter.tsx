import React, { ReactNode, createContext, useContext, useMemo, useState } from 'react';

type State = { left: number; right: number };
type Context = {
  movesValue: State;
  updateLeftClicksValue: () => void;
  updateRightClicksValue: () => void;
  resetClicksValue: () => void;
};

const MovesCounterContext = createContext<Context>({} as Context);

export function MovesCounterDataProvider({ children }: { children: ReactNode }) {
  const [movesValue, setMovesValue] = useState<State>({ left: 0, right: 0 });

  const value = useMemo(() => {
    const updateLeftClicksValue = () => {
      setMovesValue({
        ...movesValue,
        left: movesValue.left + 1,
      });
    };

    const updateRightClicksValue = () => {
      setMovesValue({
        ...movesValue,
        right: movesValue.right + 1,
      });
    };

    const resetClicksValue = () => {
      setMovesValue({ left: 0, right: 0 });
    };

    return {
      movesValue,
      updateLeftClicksValue,
      updateRightClicksValue,
      resetClicksValue,
    };
  }, [movesValue]);

  return <MovesCounterContext.Provider value={value}>{children}</MovesCounterContext.Provider>;
}

export const useMoveState = () => useContext(MovesCounterContext);

function MovesCounter() {
  const { movesValue } = useMoveState();
  return (
    <div>
      Left clicks made: {movesValue.left}
      <br />
      Right clicks made: {movesValue.right}
    </div>
  );
}

const MovesCounterMemo = React.memo(MovesCounter);

export default MovesCounterMemo;
