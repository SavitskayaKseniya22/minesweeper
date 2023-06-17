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
import { FormErrorMessagesList } from './FormErrorMessage';

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initFormValues = useSelector((state: RootState) => state.gameSettings);
  const name = useSelector((state: RootState) => state.user.name);
  const { formValues } = initFormValues;

  const {
    register,
    control,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
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
              type="text"
              {...register('bombNumber', {
                required: {
                  value: true,
                  message: `Please enter a value between ${range.min} and  ${range.max}.`,
                },
                pattern: {
                  value: /[0-9]+/,
                  message: 'The value is not a number.',
                },
                max: {
                  value: range.max,
                  message: `The value of bombs is too high. Enter a value between ${range.min} and  ${range.max}.`,
                },
                min: {
                  value: range.min,
                  message: `The value of bombs is too low. Enter a value between ${range.min} and  ${range.max}.`,
                },
              })}
              placeholder={`${String(range.min)} - ${String(range.max)}`}
            />
          </StyledContainer>

          <StyledContainer>
            <h3>Enter a name</h3>
            <input
              type="text"
              {...register('name', {
                required: {
                  value: true,
                  message: `Please enter a name.`,
                },

                minLength: {
                  value: 4,
                  message: `The name is too short. Please enter a name that is longer than three characters.`,
                },
              })}
              placeholder="Anonymous"
            />
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
      <FormErrorMessagesList errors={errors} names={['name', 'bombNumber']} />
    </main>
  );
}

export default MainPage;
