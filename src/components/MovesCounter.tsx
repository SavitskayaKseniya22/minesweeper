import React, { ReactNode, createContext, useContext, useMemo, useReducer } from 'react';

type State = { left: number; right: number };

type API = {
  updateLeftClicksValue: () => void;
  updateRightClicksValue: () => void;
  resetClicksValue: () => void;
};

type Actions =
  | { type: 'updateLeftClicksValue' }
  | { type: 'updateRightClicksValue' }
  | { type: 'resetClicksValue' };

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'updateLeftClicksValue':
      return { ...state, left: state.left + 1 };
    case 'updateRightClicksValue':
      return { ...state, left: state.right + 1 };
    case 'resetClicksValue':
      return { left: 0, right: 0 };
    default:
      return { left: 0, right: 0 };
  }
};

const MovesCounterValueContext = createContext<State>({} as State);
const MovesCounterApiContext = createContext<API>({} as API);

export function MovesCounterDataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { left: 0, right: 0 });

  const api = useMemo(() => {
    const updateLeftClicksValue = () => {
      dispatch({ type: 'updateLeftClicksValue' });
    };

    const updateRightClicksValue = () => {
      dispatch({ type: 'updateRightClicksValue' });
    };

    const resetClicksValue = () => {
      dispatch({ type: 'resetClicksValue' });
    };

    return {
      updateLeftClicksValue,
      updateRightClicksValue,
      resetClicksValue,
    };
  }, []);

  return (
    <MovesCounterValueContext.Provider value={state}>
      <MovesCounterApiContext.Provider value={api}>{children}</MovesCounterApiContext.Provider>
    </MovesCounterValueContext.Provider>
  );
}

export const useMoveState = () => useContext(MovesCounterValueContext);
export const useMoveAPI = () => useContext(MovesCounterApiContext);

function MovesCounter() {
  const { left, right } = useMoveState();
  return (
    <div>
      Left clicks made: {left}
      <br />
      Right clicks made: {right}
    </div>
  );
}

const MovesCounterMemo = React.memo(MovesCounter);

export default MovesCounterMemo;
