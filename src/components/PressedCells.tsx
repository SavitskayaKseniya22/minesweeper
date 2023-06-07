import React, { ReactNode, createContext, useContext, useMemo, useReducer } from 'react';
import { PressedIndexesType } from '../utils/interfaces';
import { clearOfDuplicates } from '../utils/utils';

const initialValue = {
  left: {
    counter: 0,
    clicks: [],
  },
  right: {
    counter: 0,
    clicks: [],
  },
};

type APILeftClicks = {
  increaseLeftCounter: () => void;
  updateLeftClicks: (index: number[]) => void;
};

type APIRightClicks = {
  increaseRightCounter: () => void;
  updateRightClicks: (index: number[]) => void;
  filterRightClicks: (index: number[]) => void;
};
type APIResetClicks = {
  resetClicksValues: () => void;
  setClicksValues: (blank: number[], bombed: number[]) => void;
};

const PressedCellsValuesContext = createContext<PressedIndexesType>({} as PressedIndexesType);
const LeftClickApiContext = createContext<APILeftClicks>({} as APILeftClicks);
const RightClickApiContext = createContext<APIRightClicks>({} as APIRightClicks);
const ResetApiContext = createContext<APIResetClicks>({} as APIResetClicks);

type Actions =
  | { type: 'increaseLeftCounter' }
  | { type: 'increaseRightCounter' }
  | { type: 'updateLeftClicks'; index: number[] }
  | { type: 'updateRightClicks'; index: number[] }
  | { type: 'filterRightClicks'; index: number[] }
  | { type: 'setClicksValues'; blank: number[]; bombed: number[] }
  | { type: 'resetClicksValues' };

const reducer = (state: PressedIndexesType, action: Actions): PressedIndexesType => {
  switch (action.type) {
    case 'increaseLeftCounter':
      return {
        ...state,
        left: {
          ...state.left,
          counter: state.left.counter + 1,
        },
      };
    case 'updateLeftClicks':
      return {
        ...state,
        left: {
          ...state.left,
          clicks: clearOfDuplicates([...state.left.clicks, ...action.index]),
        },
      };

    case 'updateRightClicks':
      return {
        ...state,
        right: {
          ...state.right,
          clicks: clearOfDuplicates([...state.right.clicks, ...action.index]),
        },
      };
    case 'filterRightClicks':
      return {
        ...state,
        right: {
          ...state.right,
          clicks: state.right.clicks.filter((elem) => !action.index.includes(elem)),
        },
      };
    case 'increaseRightCounter':
      return {
        ...state,
        right: {
          ...state.right,
          counter: state.right.counter + 1,
        },
      };
    case 'setClicksValues':
      return {
        ...state,
        right: {
          ...state.right,
          clicks: action.bombed,
        },
        left: {
          ...state.left,
          clicks: action.blank,
        },
      };
    case 'resetClicksValues':
      return initialValue;
    default:
      return initialValue;
  }
};

export function PressedCellsDataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const apiLeftClick = useMemo(() => {
    const increaseLeftCounter = () => {
      dispatch({ type: 'increaseLeftCounter' });
    };

    const updateLeftClicks = (index: number[]) => {
      dispatch({ type: 'updateLeftClicks', index });
    };

    return {
      increaseLeftCounter,
      updateLeftClicks,
    };
  }, []);

  const apiRightClick = useMemo(() => {
    const increaseRightCounter = () => {
      dispatch({ type: 'increaseRightCounter' });
    };

    const updateRightClicks = (index: number[]) => {
      dispatch({ type: 'updateRightClicks', index });
    };

    const filterRightClicks = (index: number[]) => {
      dispatch({ type: 'filterRightClicks', index });
    };

    return {
      increaseRightCounter,
      updateRightClicks,
      filterRightClicks,
    };
  }, []);

  const apiResetClicks = useMemo(() => {
    const resetClicksValues = () => {
      dispatch({ type: 'resetClicksValues' });
    };
    const setClicksValues = (blank: number[], bombed: number[]) => {
      dispatch({ type: 'setClicksValues', blank, bombed });
    };

    return {
      resetClicksValues,
      setClicksValues,
    };
  }, []);

  return (
    <PressedCellsValuesContext.Provider value={state}>
      <LeftClickApiContext.Provider value={apiLeftClick}>
        <RightClickApiContext.Provider value={apiRightClick}>
          <ResetApiContext.Provider value={apiResetClicks}>{children}</ResetApiContext.Provider>
        </RightClickApiContext.Provider>
      </LeftClickApiContext.Provider>
    </PressedCellsValuesContext.Provider>
  );
}

export const usePressedCellsState = () => useContext(PressedCellsValuesContext);
export const useLeftClickAPI = () => useContext(LeftClickApiContext);
export const useRightClickAPI = () => useContext(RightClickApiContext);
export const useResetClicksAPI = () => useContext(ResetApiContext);
