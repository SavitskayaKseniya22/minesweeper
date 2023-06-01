import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Cell from './Cell';
import {
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

  const bombList = useMemo(
    () =>
      dataToMakeCells.map((elem, i) =>
        getNearbyBombs(i, dataToMakeCells, fieldSettings.widthOfField)
      ),
    [dataToMakeCells, fieldSettings.widthOfField]
  );

  const ranges = useMemo(
    () => getConnectedRanges(bombList, fieldSettings.widthOfField),
    [bombList, fieldSettings.widthOfField]
  );

  const rawCellsList = useMemo(
    () => getCellsList(dataToMakeCells, bombList, ranges, pressedIndexes),
    [dataToMakeCells, bombList, ranges, pressedIndexes]
  );

  useEffect(() => {
    if (!isGameFinished && !isGameStarted) {
      setPressedIndexes([]);
      resetBombsValue(Number(bombNumber));
      resetClicksValue();
      openedCellsAmount.current = 0;
    }
  }, [bombNumber, isGameFinished, isGameStarted, resetBombsValue, resetClicksValue]);

  useEffect(() => {
    if (openedCellsAmount.current + Number(bombNumber) === fieldSettings.cellsNumber) {
      setIsGameFinished('win');
    }
  }, [bombNumber, fieldSettings.cellsNumber, pressedIndexes, setIsGameFinished]);

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
              openedCellsAmount.current += item.size;
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

  return (
    <StyledField aria-busy={Boolean(isGameFinished)} aria-details={difficulty}>
      {cellsList}
    </StyledField>
  );
}

const FieldMemo = React.memo(Field);

export default FieldMemo;
