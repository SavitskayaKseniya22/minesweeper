import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Cell from './Cell';
import {
  clearOfDuplicates,
  getCellsContentList,
  getCellsList,
  getFieldSettings,
  getNearbyBombs,
} from '../utils/utils';
import { GameCycleContext, InitContext } from '../contexts';
import getConnectedRanges from '../utils/funcsToOpenNearbyEmptyCells';
import { StyledField } from './styledComponents';
import { useBombsApi } from './BombsCounter';
import { useMoveAPI } from './MovesCounter';

function Field({ resetValue }: { resetValue: number }) {
  const { resetClicksValue } = useMoveAPI();
  const { resetBombsValue } = useBombsApi();
  const [indexToInsert, setIndexToInsert] = useState<number | undefined>(undefined);
  const [pressedIndexes, setPressedIndexes] = useState<number[]>([] as number[]);

  const { isGameFinished, isGameStarted, setIsGameFinished, setIsGameStarted } =
    useContext(GameCycleContext);
  const { difficulty, bombNumber } = useContext(InitContext).actionData;

  const fieldSettings = useMemo(() => getFieldSettings(difficulty), [difficulty]);

  const openedCellsAmount = useRef(0);

  const dataToMakeCells = useMemo(
    () => getCellsContentList(isGameStarted, fieldSettings.cellsNumber, bombNumber, indexToInsert),
    [bombNumber, fieldSettings.cellsNumber, indexToInsert, isGameStarted]
  );

  const bombsList = useMemo(
    () =>
      dataToMakeCells.map((elem, i) => {
        if (elem === 0) {
          return getNearbyBombs(i, dataToMakeCells, fieldSettings.width);
        }
        return 100;
      }),
    [dataToMakeCells, fieldSettings.width]
  );

  const ranges = useMemo(
    () => getConnectedRanges(bombsList, fieldSettings.width),
    [bombsList, fieldSettings.width]
  );

  const rawCellsList = useMemo(
    () => getCellsList(dataToMakeCells, bombsList, ranges, pressedIndexes, fieldSettings.width),
    [dataToMakeCells, bombsList, ranges, pressedIndexes, fieldSettings.width]
  );

  useEffect(() => {
    if (!isGameFinished && !isGameStarted) {
      setPressedIndexes([]);
      resetBombsValue(Number(bombNumber));
      resetClicksValue();
      openedCellsAmount.current = 0;
    }
  }, [bombNumber, isGameFinished, isGameStarted, resetBombsValue, resetClicksValue]);

  const cellsList = useMemo(
    () =>
      rawCellsList.map((item, index) => (
        <Cell
          key={item.toString() + index.toString() + resetValue}
          handleStartAndFinish={(e) => {
            if (!isGameStarted) {
              setIndexToInsert(index);
              setIsGameStarted(true);
            }

            if (e.type === 'click' && !item.isBombed) {
              setPressedIndexes([...pressedIndexes, index]);
            }

            if (e.type === 'click' && isGameStarted && item.isBombed) {
              setIsGameFinished('lose');
            }
          }}
          cellSettings={item}
        />
      )),
    [isGameStarted, pressedIndexes, rawCellsList, resetValue, setIsGameFinished, setIsGameStarted]
  );

  useEffect(() => {
    const sizes = clearOfDuplicates(
      pressedIndexes
        .map((elem) => rawCellsList[elem].size)
        .filter((elem) => elem !== -1)
        .flat()
    );

    if (sizes.length + Number(bombNumber) === fieldSettings.cellsNumber) {
      setIsGameFinished('win');
    }
  }, [bombNumber, fieldSettings.cellsNumber, pressedIndexes, rawCellsList, setIsGameFinished]);

  return (
    <StyledField aria-busy={Boolean(isGameFinished)} aria-details={difficulty}>
      {cellsList}
    </StyledField>
  );
}

const FieldMemo = React.memo(Field);

export default FieldMemo;
