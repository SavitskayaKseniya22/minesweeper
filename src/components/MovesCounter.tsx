import React, { ReactNode, createContext, useContext, useMemo, useState } from 'react';

type State = { left: number; right: number };
type Context = {
  state: State;
  updateLeftClicksValue: () => void;
  updateRightClicksValue: () => void;
  resetClicksValue: () => void;
};

const MovesCounterContext = createContext<Context>({} as Context);

export function MovesCounterDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ left: 0, right: 0 });

  const value = useMemo(() => {
    const updateLeftClicksValue = () => {
      setState({
        ...state,
        left: state.left + 1,
      });
    };

    const updateRightClicksValue = () => {
      setState({
        ...state,
        right: state.right + 1,
      });
    };

    const resetClicksValue = () => {
      setState({ left: 0, right: 0 });
    };

    return {
      state,
      updateLeftClicksValue,
      updateRightClicksValue,
      resetClicksValue,
    };
  }, [state]);

  return <MovesCounterContext.Provider value={value}>{children}</MovesCounterContext.Provider>;
}

export const useMoveState = () => useContext(MovesCounterContext);

function MovesCounter() {
  const { state } = useMoveState();
  return (
    <div>
      Left clicks made: {state.left}
      <br />
      Right clicks made: {state.right}
    </div>
  );
}

const MovesCounterMemo = React.memo(MovesCounter);

export default MovesCounterMemo;
