import React, { useContext, useEffect, useMemo, useState } from 'react';
import Cell from './Cell';
import { getCellsContentList, getCellsList, getNearbyBombs } from '../utils/utils';
import { GameCycleContext, InitContext } from '../contexts';
import getConnectedRanges from '../utils/funcsToOpenNearbyEmptyCells';
import { StyledField } from './styledComponents';
import { useBombsApi } from './BombsCounter';
import { useMoveAPI } from './MovesCounter';

function Field({ resetValue }: { resetValue: number }) {
  const [indexToInsert, setIndexToInsert] = useState<number | undefined>(undefined);
  const [pressedIndexes, setPressedIndexes] = useState<number[]>([] as number[]);

  const { isGameFinished, isGameStarted, setIsGameFinished, setIsGameStarted } =
    useContext(GameCycleContext);
  const { difficulty, bombNumber } = useContext(InitContext).actionData;

  const dataToMakeCells = useMemo(
    () => getCellsContentList(isGameStarted, difficulty, bombNumber, indexToInsert),
    [bombNumber, difficulty, indexToInsert, isGameStarted]
  );

  const bombList = useMemo(
    () =>
      dataToMakeCells.map((elem, i) => getNearbyBombs(i, dataToMakeCells, difficulty as string)),
    [dataToMakeCells, difficulty]
  );

  const ranges = useMemo(() => getConnectedRanges(bombList, difficulty), [bombList, difficulty]);

  const rawCellsList = useMemo(
    () => getCellsList(dataToMakeCells, bombList, ranges, pressedIndexes),
    [dataToMakeCells, bombList, ranges, pressedIndexes]
  );

  const { resetClicksValue } = useMoveAPI();
  const { resetBombsValue } = useBombsApi();

  useEffect(() => {
    if (!isGameFinished && !isGameStarted) {
      setPressedIndexes([]);
      resetBombsValue(Number(bombNumber));
      resetClicksValue();
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
            if (e.type === 'click' && isGameStarted && item.isBombed) {
              setIsGameFinished(true);
            }
            setPressedIndexes([...pressedIndexes, index]);
          }}
          cellSettings={item}
        />
      )),
    [isGameStarted, pressedIndexes, rawCellsList, resetValue, setIsGameFinished, setIsGameStarted]
  );

  return (
    <StyledField aria-busy={isGameFinished} aria-details={difficulty}>
      {cellsList}
    </StyledField>
  );
}

const FieldMemo = React.memo(Field);

export default FieldMemo;
