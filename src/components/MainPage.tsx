/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import {
  StyledButtonWide,
  StyledContainer,
  StyledContainerCentred,
  StyledForm,
  StyledTransparentButton,
} from './styledComponents';
import { updateFieldParameters, updateFormValues } from '../store/GameSettingsSlice';
import { RootState } from '../store/persistStore';
import { resetGameData } from '../store/GameDataSlice';
import { resetGameCycle } from '../store/GameCycleSlice';
import { resetStopwatch } from '../store/StopwatchSlice';
import { updateName } from '../store/UserSlice';

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initFormValues = useSelector((state: RootState) => state.gameSettings);
  const name = useSelector((state: RootState) => state.user.name);
  const { formValues } = initFormValues;

  const { register, control, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      difficulty: formValues.difficulty,
      bombNumber: formValues.bombNumber,
      name,
    },
  });

  const { bombNumberDefault, range } = initFormValues.fieldParameters;
  const gameCycleValues = useSelector((state: RootState) => state.gameCycle);
  const { isGameStarted } = gameCycleValues;

  const difficulty = useWatch({
    control,
    name: 'difficulty',
  });

  const bombNumber = useWatch({
    control,
    name: 'bombNumber',
  });

  const userName = useWatch({
    control,
    name: 'name',
  });

  useEffect(() => {
    setValue('bombNumber', bombNumberDefault);
  }, [bombNumberDefault, dispatch, setValue]);

  useEffect(() => {
    dispatch(updateFormValues({ difficulty, bombNumber: Number(bombNumber) }));
  }, [bombNumber, difficulty, dispatch]);

  useEffect(() => {
    dispatch(updateFieldParameters(difficulty));
  }, [difficulty, dispatch]);

  const onSubmit = () => {
    dispatch(resetGameCycle());
    dispatch(resetGameData());
    dispatch(resetStopwatch());
    dispatch(updateName(userName));
    navigate('/game-board');
  };

  return (
    <main>
      <StyledContainerCentred>
        <StyledTransparentButton
          type="button"
          onClick={() => {
            navigate('/stats');
          }}
        >
          <FontAwesomeIcon icon={faClipboard} />
        </StyledTransparentButton>

        <StyledForm
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => {
            dispatch(resetGameCycle());
            dispatch(resetGameData());
            dispatch(resetStopwatch());
          }}
        >
          <StyledContainer>
            <h3>Choose game difficulty</h3>
            <select {...register('difficulty')}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </StyledContainer>

          <StyledContainer>
            <h3>Enter number of bombs</h3>
            <input
              type="number"
              {...register('bombNumber', { required: true, max: range.max, min: range.min })}
              placeholder={`${String(range.min)} - ${String(range.max)}`}
            />
          </StyledContainer>
          <StyledContainer>
            <h3>Enter a name</h3>
            <input type="text" {...register('name', { required: true })} placeholder="Anonymous" />
          </StyledContainer>

          <StyledButtonWide type="submit">Start</StyledButtonWide>
          {isGameStarted && (
            <StyledButtonWide
              type="button"
              onClick={() => {
                navigate('/game-board');
              }}
            >
              resume game
            </StyledButtonWide>
          )}
        </StyledForm>
      </StyledContainerCentred>
    </main>
  );
}

export default MainPage;
