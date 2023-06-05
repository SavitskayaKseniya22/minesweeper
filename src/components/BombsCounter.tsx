import React, { ReactNode, createContext, useContext, useMemo, useReducer } from 'react';
import { InitContext } from '../contexts';

type API = {
  increaseBombsValue: () => void;
  decreseBombsValue: () => void;
  resetBombsValue: (maxValue: number) => void;
};

type Actions =
  | { type: 'increaseBombsValue' }
  | { type: 'decreseBombsValue' }
  | { type: 'resetBombsValue'; maxValue: number };

const reducer = (state: number, action: Actions): number => {
  switch (action.type) {
    case 'increaseBombsValue':
      return state + 1;
    case 'decreseBombsValue':
      return state - 1;
    case 'resetBombsValue':
      return action.maxValue;
    default:
      return action;
  }
};

const BombsCounterValueContext = createContext<number>(0);
const BombsCounterApiContext = createContext<API>({} as API);

export function BombsCounterDataProvider({ children }: { children: ReactNode }) {
  const { bombNumber } = useContext(InitContext).actionData;
  const [state, dispatch] = useReducer(reducer, Number(bombNumber));

  const api = useMemo(() => {
    const increaseBombsValue = () => {
      dispatch({ type: 'increaseBombsValue' });
    };

    const decreseBombsValue = () => {
      dispatch({ type: 'decreseBombsValue' });
    };

    const resetBombsValue = (maxValue: number) => {
      dispatch({ type: 'resetBombsValue', maxValue });
    };

    return {
      increaseBombsValue,
      decreseBombsValue,
      resetBombsValue,
    };
  }, []);

  return (
    <BombsCounterValueContext.Provider value={state}>
      <BombsCounterApiContext.Provider value={api}>{children}</BombsCounterApiContext.Provider>
    </BombsCounterValueContext.Provider>
  );
}

export const useBombsState = () => useContext(BombsCounterValueContext);
export const useBombsApi = () => useContext(BombsCounterApiContext);

function BombsCounter() {
  const value = useBombsState();
  return <div>Bombs left: {value}</div>;
}

const BombsCounterMemo = React.memo(BombsCounter);

export default BombsCounterMemo;
